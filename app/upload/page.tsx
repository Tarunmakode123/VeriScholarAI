'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/Sidebar';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  PlayCircle, 
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState<string>('');

  // Optional Metadata State
  const [documentTitle, setDocumentTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [facultyReviewer, setFacultyReviewer] = useState('');
  const [documentType, setDocumentType] = useState('Research Paper');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stages = [
    'Upload received',
    'Extracting document text',
    'Detecting document structure',
    'Extracting citations',
    'Extracting references',
    'Extracting claims',
    'Checking references',
    'Checking citation support',
    'Analyzing similarity',
    'Generating integrity findings',
    'Preparing faculty report'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        setErrorMessage('File size exceeds the 20MB limit. Please upload a smaller file.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
      if (!documentTitle) {
        setDocumentTitle(file.name.replace(/\.[^/.]+$/, ''));
      }

      // If text or markdown file, read raw content directly for instant preview
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setRawText(event.target?.result as string || '');
        };
        reader.readAsText(file);
      }
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile && !rawText) {
      setErrorMessage('Please select a file to upload or enter text.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // Run real animated pipeline progress
    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(i);
      await new Promise((r) => setTimeout(r, 220));
    }

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      }
      formData.append('title', documentTitle || selectedFile?.name || 'Academic Submission');
      formData.append('author_name', authorName || 'Academic Author');
      formData.append('department', department || 'Faculty Review');
      formData.append('course', course || 'Academic Submission');
      formData.append('semester', semester || 'Current Term');
      formData.append('faculty_reviewer', facultyReviewer || 'Authorized Faculty Reviewer');
      formData.append('document_type', documentType);
      if (rawText) {
        formData.append('raw_text', rawText);
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Analysis failed on server.');
      }

      const data = await res.json();
      if (data.report_id) {
        if (data.report && typeof window !== 'undefined') {
          localStorage.setItem(`report_${data.report_id}`, JSON.stringify(data.report));
          localStorage.setItem('latest_report', JSON.stringify(data.report));
        }
        router.push(`/report/${data.report_id}`);
      } else {
        throw new Error('No report ID returned.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Live analysis encountered a processing error. Please try Demo Mode or check file format.');
      setIsProcessing(false);
    }
  };

  const handleLoadDemo = () => {
    router.push('/report/demo-report-2026-001');
  };

  return (
    <div className="flex min-h-screen bg-surface-light">
      <Sidebar />

      <main className="flex-1 p-8 max-w-4xl space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Document Ingestion
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
            Upload Document
          </h1>
          <p className="text-xs text-charcoal-600">
            Analyze a research paper, assignment, thesis chapter, project report, or academic document.
          </p>
        </div>

        <DisclaimerBanner />

        {/* Demo Mode Action Box */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Demo Mode — Synthetic Example
              </span>
            </div>
            <p className="text-xs text-purple-800">
              Instantly test the full faculty review experience using a pre-constructed synthetic thesis draft containing citation mismatches and numerical claim issues.
            </p>
          </div>
          <button
            onClick={handleLoadDemo}
            className="shrink-0 px-4 py-2.5 rounded-lg bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-xs flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            Load Synthetic Demo
          </button>
        </div>

        {/* Upload & Form Container */}
        <div className="bg-white rounded-xl border border-surface-border p-6 shadow-2xs space-y-6">
          <h2 className="text-sm font-bold text-charcoal-900 border-b border-surface-border pb-3">
            1. Document File Selection
          </h2>

          {/* Drag and Drop Box */}
          <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 bg-surface-light hover:bg-brand-50/20 rounded-2xl p-8 text-center transition-colors cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.docx,.txt,.md"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center shadow-xs">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal-900">
                  {selectedFile ? selectedFile.name : 'Drag & Drop academic file here, or click to browse'}
                </p>
                <p className="text-xs text-charcoal-600 mt-1">
                  Supported formats: PDF, DOCX, TXT, MD (Max 20MB)
                </p>
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="bg-brand-50/60 border border-brand-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-brand-500" />
                <div>
                  <div className="text-xs font-bold text-charcoal-900">{selectedFile.name}</div>
                  <div className="text-[11px] text-charcoal-600">
                    Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
                  </div>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              {errorMessage}
            </div>
          )}

          <h2 className="text-sm font-bold text-charcoal-900 border-b border-surface-border pb-3 pt-2">
            2. Optional Document Metadata (Demo Optional)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Document Title
              </label>
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="e.g. Quantum Biomedical ECG Signal Detection"
                className="w-full p-2.5 bg-white border border-surface-border rounded-lg text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Document Type
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full p-2.5 bg-white border border-surface-border rounded-lg text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
              >
                <option value="Research Paper">Research Paper</option>
                <option value="Assignment">Assignment</option>
                <option value="Project Report">Project Report</option>
                <option value="Thesis / Dissertation">Thesis / Dissertation</option>
                <option value="Literature Review">Literature Review</option>
                <option value="Technical Report">Technical Report</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Author / Student Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex Vance"
                className="w-full p-2.5 bg-white border border-surface-border rounded-lg text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-charcoal-700 block mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Biomedical Engineering"
                className="w-full p-2.5 bg-white border border-surface-border rounded-lg text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Progress Modal / Processing Interface */}
          {isProcessing ? (
            <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />
                <h3 className="text-sm font-bold">Executing Analysis Pipeline...</h3>
              </div>
              <div className="space-y-2">
                {stages.map((stg, i) => (
                  <div key={stg} className="flex items-center gap-3 text-xs">
                    {i < processingStage ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : i === processingStage ? (
                      <div className="w-4 h-4 rounded-full border-2 border-brand-500 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className={i <= processingStage ? 'text-slate-100 font-medium' : 'text-slate-500'}>
                      {stg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={handleStartAnalysis}
              disabled={!selectedFile && !rawText}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-500/20"
            >
              Analyze Document
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
