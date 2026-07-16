import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Folder, 
  File, 
  FileText, 
  Trash2, 
  Upload, 
  Plus, 
  Search, 
  LogOut, 
  CheckCircle, 
  Download, 
  ExternalLink, 
  FolderPlus, 
  RefreshCw, 
  AlertTriangle,
  FileSpreadsheet,
  FileImage,
  ArrowRight,
  Sparkles,
  Lock
} from "lucide-react";
import { User } from "firebase/auth";
import { googleSignIn, logout, initAuth } from "../lib/firebaseAuth";

interface GoogleDriveVaultProps {
  onBookCounselling?: (details: string) => void;
  onBackToHome?: () => void;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  createdTime?: string;
}

export default function GoogleDriveVault({ onBookCounselling, onBackToHome }: GoogleDriveVaultProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Drive list states
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "folders" | "documents" | "media">("all");
  
  // Folder navigation
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderHistory, setFolderHistory] = useState<{ id: string | null; name: string }[]>([
    { id: null, name: "Root" }
  ]);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // New folder dialog
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Attachment feedback
  const [attachedFile, setAttachedFile] = useState<DriveFile | null>(null);

  // Delete modal state
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
      },
      () => {
        setNeedsAuth(true);
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch files whenever token or current folder changes
  useEffect(() => {
    if (token) {
      fetchDriveFiles();
    }
  }, [token, currentFolderId]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Failed to sign in. Please verify your internet connection or Google permission settings.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setFiles([]);
      setFolderHistory([{ id: null, name: "Root" }]);
      setCurrentFolderId(null);
      setNeedsAuth(true);
      setAttachedFile(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Google Drive API: Fetch Files in current folder
  const fetchDriveFiles = async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);

    try {
      let query = "trashed = false";
      if (currentFolderId) {
        query += ` and '${currentFolderId}' in parents`;
      } else {
        query += " and 'root' in parents";
      }

      const fields = "files(id, name, mimeType, size, webViewLink, createdTime)";
      const url = `https://www.googleapis.com/drive/v3/files?pageSize=50&fields=${fields}&q=${encodeURIComponent(query)}&orderBy=folder,name`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid, reset auth
          setNeedsAuth(true);
          setToken(null);
          throw new Error("Your session has expired. Please sign in with Google again.");
        }
        throw new Error(`Google Drive returned an error: ${response.statusText}`);
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (err: any) {
      console.error("Fetch files error:", err);
      setError(err.message || "Failed to load Google Drive content.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Drive API: Create Folder
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFolderName.trim()) return;
    setIsCreatingFolder(true);
    setError(null);

    try {
      const metadata: any = {
        name: newFolderName.trim(),
        mimeType: "application/vnd.google-apps.folder"
      };

      if (currentFolderId) {
        metadata.parents = [currentFolderId];
      }

      const response = await fetch("https://www.googleapis.com/drive/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(metadata)
      });

      if (!response.ok) {
        throw new Error("Failed to create folder on Google Drive.");
      }

      setNewFolderName("");
      setShowFolderModal(false);
      // Refresh list
      fetchDriveFiles();
    } catch (err: any) {
      setError(err.message || "Error creating folder.");
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Google Drive API: Multipart File Upload
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !uploadFile) return;

    setIsUploading(true);
    setUploadProgress("Preparing document package...");
    setError(null);

    try {
      const metadata: any = {
        name: uploadFile.name,
        mimeType: uploadFile.type
      };

      if (currentFolderId) {
        metadata.parents = [currentFolderId];
      }

      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      formData.append("file", uploadFile);

      setUploadProgress("Transmitting to secure server...");
      const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Upload failed. Please check file permissions or try a smaller file.");
      }

      setUploadProgress("Document verified successfully!");
      setUploadFile(null);
      setTimeout(() => {
        setUploadProgress(null);
        setIsUploading(false);
        fetchDriveFiles();
      }, 1200);

    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload document.");
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  // Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

  // Google Drive API: Delete File (With required confirmation)
  const handleDeleteConfirm = async () => {
    if (!token || !fileToDelete) return;
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete the selected file.");
      }

      setFileToDelete(null);
      fetchDriveFiles();
    } catch (err: any) {
      setError(err.message || "Error deleting file.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Navigating into folders
  const openFolder = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setFolderHistory(prev => [...prev, { id: folderId, name: folderName }]);
  };

  // Breadcrumb navigation
  const navigateToBreadcrumb = (index: number) => {
    const destination = folderHistory[index];
    setCurrentFolderId(destination.id);
    setFolderHistory(prev => prev.slice(0, index + 1));
  };

  // Attach document callback to counselling query
  const attachToCounselling = (file: DriveFile) => {
    setAttachedFile(file);
    if (onBookCounselling) {
      onBookCounselling(`Consultant review requested for Google Drive file: "${file.name}" (ID: ${file.id}). Please verify IELTS/Transcript document during call-back.`);
    }
  };

  // Helpers for file size formatting
  const formatBytes = (bytesStr?: string) => {
    if (!bytesStr) return "Folder";
    const bytes = parseInt(bytesStr);
    if (isNaN(bytes)) return "N/A";
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Detect icon helper based on mime-type
  const getFileIcon = (mimeType: string) => {
    if (mimeType === "application/vnd.google-apps.folder") {
      return <Folder className="h-5 w-5 text-blue-500 fill-blue-50/20 shrink-0" />;
    }
    if (mimeType.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500 shrink-0" />;
    }
    if (mimeType.includes("word") || mimeType.includes("officedocument.word") || mimeType === "application/vnd.google-apps.document") {
      return <FileText className="h-5 w-5 text-blue-600 shrink-0" />;
    }
    if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType === "application/vnd.google-apps.spreadsheet") {
      return <FileSpreadsheet className="h-5 w-5 text-emerald-600 shrink-0" />;
    }
    if (mimeType.includes("image")) {
      return <FileImage className="h-5 w-5 text-pink-500 shrink-0" />;
    }
    return <File className="h-5 w-5 text-slate-500 shrink-0" />;
  };

  // Filter and search
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === "folders") {
      return matchesSearch && file.mimeType === "application/vnd.google-apps.folder";
    }
    if (filterType === "documents") {
      return matchesSearch && file.mimeType !== "application/vnd.google-apps.folder" && (
        file.mimeType.includes("pdf") || file.mimeType.includes("word") || file.mimeType.includes("text") || file.mimeType.includes("document")
      );
    }
    if (filterType === "media") {
      return matchesSearch && (file.mimeType.includes("image") || file.mimeType.includes("video"));
    }
    return matchesSearch;
  });

  return (
    <div className="w-full bg-slate-50/50 py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Upper Header Meta Navigation */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-5">
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#0047AB] uppercase block mb-1 font-mono">
              🚀 STUDENT WORKSPACE
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              Google Drive Document Vault
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
              Store, submit, and assess your study abroad credentials securely via official cloud integrations.
            </p>
          </div>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-3xs transition-all hover:border-gray-300"
            >
              Back to Hub
            </button>
          )}
        </div>

        {/* AUTHENTICATION NEEDED BOARD */}
        {needsAuth ? (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 text-center shadow-md space-y-8 max-w-2xl mx-auto">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0047AB]">
              <Lock className="h-8 w-8" />
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Connect Your Google Drive
              </h2>
              <p className="text-gray-550 text-sm font-semibold max-w-md mx-auto leading-relaxed">
                Connect your Google account to select or upload transcripts, IELTS/PTE scorecards, and admission SOP letters. Career Wings evaluates your files directly from your personal Drive securely.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left space-y-3">
              <span className="text-[10px] font-black text-[#0047AB] font-mono tracking-widest block uppercase">
                🔒 Privacy & Security Standards:
              </span>
              <ul className="text-xs text-gray-600 space-y-2 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  We use sandbox scopes so we only access files you select or upload.
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  Your access token is kept strictly in-memory and never stored on disk.
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  Direct connection with Google Cloud Project <span className="font-mono text-[10.5px] bg-slate-200/60 px-1 py-0.2 rounded font-black text-slate-800">teak-tomorrow-tw1xt</span>.
                </li>
              </ul>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-xs font-bold p-4 rounded-xl border border-red-100 flex items-start gap-2.5 text-left leading-normal">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex flex-col items-center justify-center">
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="gsi-material-button w-full sm:w-auto shadow-sm"
              >
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents font-black text-sm">
                    {isLoggingIn ? "Establishing Handshake..." : "Sign in with Google"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* MAIN LOGGED-IN DOCUMENT DASHBOARD */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 4 COLS: UPLOAD & ACTIONS PANEL */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* User Identity Info Card */}
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || "User"} 
                      className="w-11 h-11 rounded-full border border-gray-150"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#0047AB] text-white flex items-center justify-center font-bold text-sm">
                      {user?.displayName?.substring(0, 2).toUpperCase() || "ST"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-black text-gray-900 truncate">
                      {user?.displayName || "Google Scholar"}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700">
                    <CheckCircle className="h-3 w-3" /> Connected
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 bg-red-50/40 hover:bg-red-50 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Sign Out
                  </button>
                </div>
              </div>

              {/* Secure Document Upload Zone */}
              <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs space-y-4">
                <div>
                  <h4 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                    <Upload className="h-4 w-4 text-[#0047AB]" />
                    Upload File to Drive
                  </h4>
                  <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    Selected documents are transmitted directly into the current Drive folder path.
                  </p>
                </div>

                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                      isDragActive 
                        ? "border-[#0047AB] bg-blue-50/20" 
                        : "border-gray-200 hover:border-[#0047AB]/50 bg-slate-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      id="vault-file-picker"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadFile(e.target.files[0]);
                        }
                      }}
                    />
                    <label htmlFor="vault-file-picker" className="cursor-pointer block space-y-2">
                      <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center mx-auto text-gray-500 shadow-3xs">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="text-xs font-black text-gray-800">
                        {uploadFile ? uploadFile.name : "Drag & Drop or Click to browse"}
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold">
                        PDF, Word, Excel, or Images up to 25MB
                      </p>
                    </label>
                  </div>

                  {uploadFile && (
                    <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-bold text-gray-700">
                      <span className="truncate max-w-[180px]">{uploadFile.name}</span>
                      <button 
                        type="button" 
                        onClick={() => setUploadFile(null)} 
                        className="text-red-500 hover:text-red-700 font-black"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10.5px] font-bold text-[#0047AB]">
                        <span className="flex items-center gap-1.5">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          {uploadProgress}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#0047AB] h-full rounded-full animate-pulse w-4/5" />
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={!uploadFile}
                      className="w-full bg-[#0047AB] text-white text-xs font-black py-3 rounded-2xl shadow-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Upload into Current Path
                    </button>
                  )}
                </form>
              </div>

              {/* Direct Assessment Callback Assistant */}
              {attachedFile && (
                <div className="bg-emerald-50 rounded-3xl border border-emerald-200/80 p-5 shadow-xs space-y-3 animate-slide-up">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-emerald-900">Document Linked!</h4>
                      <p className="text-[11px] text-emerald-700/90 font-semibold leading-relaxed mt-0.5">
                        Selected file <strong>{attachedFile.name}</strong> has been successfully linked with your callback counseling query! 
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 text-[10.5px] font-bold text-gray-700">
                    Your Senior Counselor will evaluate this document prior to contacting you.
                  </div>
                  <button
                    onClick={() => setAttachedFile(null)}
                    className="w-full py-1.5 text-center text-[10.5px] font-black text-emerald-800 hover:text-red-600 transition-colors"
                  >
                    Detach Document
                  </button>
                </div>
              )}

              {/* Information disclaimer box */}
              <div className="bg-amber-50/50 rounded-3xl border border-amber-200/60 p-5 text-xs font-semibold text-amber-900/90 leading-relaxed space-y-2">
                <span className="flex items-center gap-1.5 text-amber-800 font-extrabold uppercase text-[10px] tracking-wider font-mono">
                  <AlertTriangle className="h-4 w-4 text-amber-600" /> API Consent & Limits
                </span>
                <p>
                  We securely interact directly with Google Drive using the access token. To keep your storage completely free of junk, you can delete files directly using our console. Files deleted via the portal will reside in your account's Drive trash bin.
                </p>
              </div>

            </div>

            {/* RIGHT 8 COLS: FILE VIEWER DIRECTORY */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-xs space-y-6">
              
              {/* Directory Filter & Search Header */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-gray-100 pb-5">
                <div className="flex-1 max-w-sm relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search inside current path..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-semibold bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0047AB]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFolderModal(true)}
                    className="flex items-center gap-1.5 text-xs font-black bg-slate-50 border border-gray-200 text-gray-800 hover:bg-slate-100 px-3.5 py-2.5 rounded-xl transition-all shadow-3xs"
                  >
                    <FolderPlus className="h-4 w-4 text-[#0047AB]" />
                    New Folder
                  </button>
                  <button
                    onClick={fetchDriveFiles}
                    disabled={isLoading}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600 rounded-xl transition-all shadow-3xs"
                    title="Refresh folder"
                  >
                    <RefreshCw className={`h-4.5 w-4.5 ${isLoading ? "animate-spin text-[#0047AB]" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Breadcrumb Workspace Path */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100/80 text-xs text-gray-500 font-bold overflow-x-auto scrollbar-none">
                <span className="text-[#0047AB] font-mono text-[10px] font-black uppercase tracking-wider mr-1 shrink-0">
                  📂 CURRENT DRIVE PATH:
                </span>
                {folderHistory.map((folder, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-gray-300">/</span>}
                    <button
                      onClick={() => navigateToBreadcrumb(idx)}
                      disabled={idx === folderHistory.length - 1}
                      className={`hover:underline cursor-pointer py-0.5 px-1.5 rounded-md transition-colors ${
                        idx === folderHistory.length - 1 
                          ? "text-[#0047AB] font-black pointer-events-none" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {folder.name}
                    </button>
                  </React.Fragment>
                ))}
              </div>

              {/* Quick Mime Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    filterType === "all" 
                      ? "bg-[#0047AB] text-white" 
                      : "bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600"
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setFilterType("folders")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    filterType === "folders" 
                      ? "bg-[#0047AB] text-white" 
                      : "bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600"
                  }`}
                >
                  Folders Only
                </button>
                <button
                  onClick={() => setFilterType("documents")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    filterType === "documents" 
                      ? "bg-[#0047AB] text-white" 
                      : "bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600"
                  }`}
                >
                  Transcripts & SOPs
                </button>
                <button
                  onClick={() => setFilterType("media")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    filterType === "media" 
                      ? "bg-[#0047AB] text-white" 
                      : "bg-slate-50 hover:bg-slate-100 border border-gray-200 text-gray-600"
                  }`}
                >
                  Images & Media
                </button>
              </div>

              {/* CORE DIRECTORY VIEWER CONTAINER */}
              {isLoading ? (
                <div className="space-y-3.5 py-12 text-center flex flex-col items-center justify-center">
                  <RefreshCw className="h-9 w-9 text-[#0047AB] animate-spin" />
                  <div className="space-y-1">
                    <p className="text-xs font-black text-gray-800">Reading directory files...</p>
                    <p className="text-[11px] text-gray-400 font-semibold">Communicating with Google Cloud Platform Storage</p>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-6 rounded-3xl border border-red-100 space-y-3 text-center">
                  <AlertTriangle className="h-8 w-8 text-red-600 mx-auto" />
                  <div>
                    <h5 className="font-black text-sm">Failed to retrieve Drive files</h5>
                    <p className="text-xs text-red-600/90 font-semibold mt-1 leading-normal">
                      {error}
                    </p>
                  </div>
                  <button
                    onClick={fetchDriveFiles}
                    className="text-xs font-black px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl transition-all"
                  >
                    Retry Handshake
                  </button>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-150 rounded-3xl space-y-3.5">
                  <div className="mx-auto w-12 h-12 bg-slate-50 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                    <Folder className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-black text-slate-800">No matching items here</h5>
                    <p className="text-[10.5px] text-gray-400 font-semibold">
                      {searchQuery ? "Try altering search terms" : "Upload your first IELTS/PTE reports or SOP file!"}
                    </p>
                  </div>
                </div>
              ) : (
                /* FILE GRID/LIST DISPLAY */
                <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                  {filteredFiles.map((file) => {
                    const isFolder = file.mimeType === "application/vnd.google-apps.folder";
                    
                    return (
                      <div
                        key={file.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/5 transition-all gap-3 shadow-3xs"
                      >
                        <div 
                          onClick={() => {
                            if (isFolder) {
                              openFolder(file.id, file.name);
                            }
                          }}
                          className={`flex items-start gap-3 min-w-0 ${isFolder ? "cursor-pointer group" : ""}`}
                        >
                          <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl">
                            {getFileIcon(file.mimeType)}
                          </div>
                          
                          <div className="min-w-0">
                            <span className={`text-xs font-black leading-tight block truncate text-slate-800 ${
                              isFolder ? "group-hover:text-[#0047AB]" : ""
                            }`}>
                              {file.name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-gray-400 font-semibold">
                              <span>{formatBytes(file.size)}</span>
                              {file.createdTime && (
                                <>
                                  <span className="h-1 w-1 bg-gray-300 rounded-full" />
                                  <span>Added {new Date(file.createdTime).toLocaleDateString()}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ACTIONS ROW FOR EACH ITEM */}
                        <div className="flex items-center gap-1.5 justify-end sm:border-l sm:border-gray-100 sm:pl-3 ml-auto sm:ml-0">
                          
                          {!isFolder && (
                            <button
                              onClick={() => attachToCounselling(file)}
                              className="text-[10.5px] font-black text-emerald-600 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-100 px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 shrink-0"
                              title="Attach to Callback Form"
                            >
                              <Sparkles className="h-3 w-3 shrink-0" />
                              <span>Link File</span>
                            </button>
                          )}

                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-gray-500 hover:text-gray-900 bg-slate-50 hover:bg-slate-100 border border-gray-150 rounded-lg transition-all"
                              title="Open in Google Drive"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <button
                            onClick={() => setFileToDelete(file)}
                            className="p-1.5 text-red-500 hover:text-white hover:bg-red-500 bg-red-50/50 hover:bg-red-500 border border-red-100/50 rounded-lg transition-all"
                            title="Delete permanently"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* NEW FOLDER POPUP DIALOG */}
      <AnimatePresence>
        {showFolderModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div 
              onClick={() => setShowFolderModal(false)} 
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity" 
            />
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative transform overflow-hidden rounded-2xl bg-white border border-gray-250 p-6 shadow-2xl w-full max-w-sm transition-all"
              >
                <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                  <FolderPlus className="h-4 w-4 text-[#0047AB]" />
                  Create Google Drive Folder
                </h3>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                  Enter a custom label. The folder will be established inside: <span className="text-[#0047AB] font-black">{folderHistory[folderHistory.length - 1].name}</span>.
                </p>

                <form onSubmit={handleCreateFolder} className="mt-4 space-y-4">
                  <input
                    type="text"
                    required
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="e.g. Academic Transcripts"
                    className="w-full px-3 py-2.5 text-xs font-semibold bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0047AB]"
                  />

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowFolderModal(false)}
                      className="text-xs font-bold text-gray-500 hover:text-gray-900 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCreatingFolder || !newFolderName.trim()}
                      className="text-xs font-black bg-[#0047AB] text-white hover:bg-blue-700 px-4 py-2.5 rounded-xl disabled:opacity-40 transition-colors"
                    >
                      {isCreatingFolder ? "Creating..." : "Establish Folder"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* STRICT DESTRUCTIVE DELETE CONFIRMATION DIALOG (MANDATORY IN WORKSPACE SKILL) */}
      <AnimatePresence>
        {fileToDelete && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div 
              onClick={() => setFileToDelete(null)} 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
            />
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative transform overflow-hidden rounded-3xl bg-white border border-red-200 p-6 sm:p-8 text-left shadow-2xl w-full max-w-md transition-all"
              >
                <div className="mx-auto w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-4">
                  <AlertTriangle className="h-6 w-6" />
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-black text-slate-900">
                    Confirm Permanent Deletion?
                  </h3>
                  <p className="text-xs text-gray-550 font-semibold leading-relaxed">
                    Are you sure you want to delete <strong className="text-red-600">{fileToDelete.name}</strong> from your Google Drive? This operation cannot be undone.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setFileToDelete(null)}
                    disabled={isDeleting}
                    className="text-xs font-bold text-gray-500 hover:text-gray-900 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className="text-xs font-black bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-2xl transition-colors shrink-0 flex items-center gap-1"
                  >
                    {isDeleting ? "Deleting File..." : "Yes, Delete File"}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
