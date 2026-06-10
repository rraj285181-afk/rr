"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Concierge } from "@/components/Concierge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronLeft,
  Camera,
  FileSpreadsheet,
  Download,
  Upload,
  Calendar,
  Sparkles,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileImage,
  RefreshCw,
  Clock,
  ShieldCheck,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdBanner } from "@/components/AdBanner";
import { jsPDF } from "jspdf";

// Preset target removed, custom inputs are default.

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<string>("compressor");

  return (
    <div className="min-h-screen flex flex-col bg-background bg-grid-pattern relative overflow-hidden">
      {/* Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-500/10 dark:bg-teal-500/5 blur-[100px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/65 backdrop-blur-xl border-b border-border/40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Portal Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-black text-xs">J</span>
              </div>
              <span className="text-sm font-bold text-primary tracking-tight">JobIndians</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-24 pb-16 z-10 relative flex-1">
        <main className="max-w-4xl w-full mx-auto px-4 md:px-6 space-y-8">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary to-indigo-600 dark:from-indigo-950 dark:to-slate-900 p-8 md:p-12 text-primary-foreground rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute right-[-30px] top-[-30px] w-52 h-52 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 dark:bg-sky-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-400 dark:text-sky-300">
                <Sparkles className="w-3.5 h-3.5" />
                Aspirants Utility Hub
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Official Utility Tools</h1>
              <p className="text-sm md:text-base text-primary-foreground/80 max-w-2xl leading-relaxed">
                Aspirants ke liye banaye gaye specialized tools. Client-side processing ki wajah se aapka data aur documents bilkul surakshit (100% private) hain.
              </p>
            </div>
          </div>

          {/* Unified Tool Tabs */}
          <Tabs defaultValue="compressor" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 max-w-lg mx-auto bg-muted/60 p-1 border rounded-2xl h-12 shadow-sm">
              <TabsTrigger value="compressor" className="rounded-xl font-bold text-xs uppercase tracking-wider transition-all">
                <Camera className="w-4 h-4 mr-2" />
                Image Resizer
              </TabsTrigger>
              <TabsTrigger value="pdf-converter" className="rounded-xl font-bold text-xs uppercase tracking-wider transition-all">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Image to PDF
              </TabsTrigger>
              <TabsTrigger value="calculator" className="rounded-xl font-bold text-xs uppercase tracking-wider transition-all">
                <Calendar className="w-4 h-4 mr-2" />
                Age Calculator
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Image Resizer & Compressor */}
            <TabsContent value="compressor">
              <ImageCompressorTool />
            </TabsContent>

            {/* Tab 2: PDF Converter */}
            <TabsContent value="pdf-converter">
              <PDFConverterTool />
            </TabsContent>

            {/* Tab 3: Age Calculator */}
            <TabsContent value="calculator">
              <AgeCalculatorTool />
            </TabsContent>
          </Tabs>

          <AdBanner adSlot="3693488562" variant="horizontal" className="my-0" />

        </main>
      </div>

      <Concierge />
    </div>
  );
}

// -------------------------------------------------------------
// PHOTO & SIGNATURE COMPRESSOR / RESIZER COMPONENT
// -------------------------------------------------------------
function ImageCompressorTool() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
  const [optimizedImageSrc, setOptimizedImageSrc] = useState<string | null>(null);
  const [originalSizeKB, setOriginalSizeKB] = useState<number>(0);
  const [optimizedSizeKB, setOptimizedSizeKB] = useState<number>(0);
  
  // Custom states
  const [customWidth, setCustomWidth] = useState<number>(350);
  const [customHeight, setCustomHeight] = useState<number>(450);
  const [customMaxKB, setCustomMaxKB] = useState<number>(50);
  
  const [quality, setQuality] = useState<number>(0.8);
  const [isAutoCompressing, setIsAutoCompressing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core image processor function
  const processImage = useCallback((file: File, targetW: number, targetH: number, qual: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setOriginalImageSrc(dataUrl);
      setOriginalSizeKB(file.size / 1024);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Draw image inside canvas preserving dimensions (forced fit for formal photos)
          ctx.drawImage(img, 0, 0, targetW, targetH);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", qual);
          setOptimizedImageSrc(compressedDataUrl);

          // Calculate size from base64
          const head = "data:image/jpeg;base64,";
          const base64Str = compressedDataUrl.substring(head.length);
          const size = (base64Str.length * 0.75) / 1024;
          setOptimizedSizeKB(size);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle file drop/upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      processImage(file, customWidth, customHeight, quality);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImageFile(file);
      processImage(file, customWidth, customHeight, quality);
    }
  };

  // Run the iterative auto-compressor to target size
  const handleAutoCompress = () => {
    if (!imageFile || !originalImageSrc) return;
    setIsAutoCompressing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = customWidth;
      canvas.height = customHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsAutoCompressing(false);
        return;
      }
      ctx.drawImage(img, 0, 0, customWidth, customHeight);

      let currentQuality = 0.95;
      let finalDataUrl = "";
      let finalSize = 0;

      // Iterative binary-search-like process to match the target KB
      for (let i = 0; i < 15; i++) {
        finalDataUrl = canvas.toDataURL("image/jpeg", currentQuality);
        const head = "data:image/jpeg;base64,";
        const base64Str = finalDataUrl.substring(head.length);
        finalSize = (base64Str.length * 0.75) / 1024;

        if (finalSize <= customMaxKB) {
          break;
        }
        currentQuality -= 0.06;
        if (currentQuality < 0.05) {
          currentQuality = 0.05;
          break;
        }
      }

      setQuality(currentQuality);
      setOptimizedImageSrc(finalDataUrl);
      setOptimizedSizeKB(finalSize);
      setIsAutoCompressing(false);
    };
    img.src = originalImageSrc;
  };

  // Re-run compression when sliders change
  const handleWidthChange = (val: number) => {
    setCustomWidth(val);
    if (imageFile) processImage(imageFile, val, customHeight, quality);
  };

  const handleHeightChange = (val: number) => {
    setCustomHeight(val);
    if (imageFile) processImage(imageFile, customWidth, val, quality);
  };

  const handleQualityChange = (val: number) => {
    setQuality(val);
    if (imageFile) processImage(imageFile, customWidth, customHeight, val);
  };

  const handleDownload = () => {
    if (!optimizedImageSrc) return;
    const link = document.createElement("a");
    const safeName = imageFile ? imageFile.name.split(".")[0] : "optimized_doc";
    link.download = `${safeName}_resized.jpg`;
    link.href = optimizedImageSrc;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setImageFile(null);
    setOriginalImageSrc(null);
    setOptimizedImageSrc(null);
    setOriginalSizeKB(0);
    setOptimizedSizeKB(0);
    setQuality(0.8);
  };

  const isSizeValid = optimizedSizeKB <= customMaxKB;

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8 animate-in fade-in-50">

      {/* Drag and Drop Zone */}
      {!imageFile ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border/60 hover:border-primary/50 rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 bg-muted/5 group space-y-4 flex flex-col items-center justify-center min-h-[240px]"
        >
          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="font-bold text-sm md:text-base text-foreground">Select Image or Drag & Drop here</p>
            <p className="text-xs text-muted-foreground mt-1">Supports JPG, JPEG, PNG (Image is processed 100% inside your browser)</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-t border-border/20 pt-6">
          
          {/* Settings and Adjusters */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <FileImage className="w-5 h-5 text-primary" />
                Adjustment Settings
              </h3>
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs font-bold text-destructive hover:bg-destructive/10">
                Remove Image
              </Button>
            </div>

            {/* Custom Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="target-w" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Width (px)</Label>
                <Input
                  id="target-w"
                  type="number"
                  value={customWidth}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  className="rounded-xl h-10 font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="target-h" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Height (px)</Label>
                <Input
                  id="target-h"
                  type="number"
                  value={customHeight}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  className="rounded-xl h-10 font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="target-kb" className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">Max Size (KB)</Label>
                <Input
                  id="target-kb"
                  type="number"
                  value={customMaxKB}
                  onChange={(e) => setCustomMaxKB(parseInt(e.target.value) || 0)}
                  className="rounded-xl h-10 font-bold"
                />
              </div>
            </div>

            {/* Adjust Quality Slider */}
            <div className="space-y-3 p-4 bg-muted/10 rounded-2xl border border-border/30">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-muted-foreground">Compression Quality</span>
                <span className="text-primary font-extrabold">{Math.round(quality * 100)}%</span>
              </div>
              <Slider
                min={0.05}
                max={1.0}
                step={0.01}
                value={[quality]}
                onValueChange={(val) => handleQualityChange(val[0])}
                className="py-2"
              />
              <p className="text-[10px] text-muted-foreground leading-normal">
                Quality kam karne se file size (KB) kam hoga, aur scale badhane se clear details rahengi.
              </p>
            </div>

            {/* Quick Auto-Fit Action */}
            <Button
              onClick={handleAutoCompress}
              disabled={isAutoCompressing}
              variant="outline"
              className="w-full h-11 rounded-xl font-bold text-xs uppercase tracking-wider border-primary/20 text-primary hover:bg-primary/[0.02] flex items-center justify-center gap-2"
            >
              {isAutoCompressing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Finding Best Quality Match...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Auto-Fit Under {customMaxKB} KB
                </>
              )}
            </Button>
          </div>

          {/* Results Preview */}
          <div className="space-y-6 bg-muted/5 border border-border/40 p-6 rounded-3xl">
            <h3 className="font-bold text-base">Optimized Output</h3>
            
            <div className="flex flex-col items-center justify-center bg-card border border-border/50 rounded-2xl p-4 overflow-hidden max-h-[260px] aspect-video relative group">
              {optimizedImageSrc ? (
                <img
                  src={optimizedImageSrc}
                  alt="Optimized preview"
                  className="max-h-full max-w-full object-contain rounded shadow-sm border"
                />
              ) : (
                <span className="text-xs text-muted-foreground italic">Generating Preview...</span>
              )}
            </div>

            {/* Size comparison statistics card */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-card border rounded-2xl">
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Original Size</span>
                <span className="text-sm md:text-base font-black text-foreground">{originalSizeKB.toFixed(1)} KB</span>
              </div>
              <div className={cn(
                "p-3 border rounded-2xl transition-colors",
                isSizeValid 
                  ? "bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-400" 
                  : "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400"
              )}>
                <span className="text-[10px] font-bold uppercase block opacity-80">Output Size</span>
                <span className="text-sm md:text-base font-black">{optimizedSizeKB.toFixed(1)} KB</span>
              </div>
            </div>

            {/* Verification Badge */}
            <div className={cn(
              "flex items-center gap-2 p-3.5 rounded-2xl text-xs font-semibold border leading-tight",
              isSizeValid
                ? "bg-green-500/[0.02] border-green-500/20 text-green-700 dark:text-green-400"
                : "bg-amber-500/[0.02] border-amber-500/20 text-amber-700 dark:text-amber-400"
            )}>
              {isSizeValid ? (
                <>
                  <CheckCircle className="w-4 h-4 shrink-0 text-green-500" />
                  <span>Verified: Ye file target size ({customMaxKB} KB) ke under hai. Aap ise forms me upload kar sakte hain.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>Size Exceeded: Ye file limit se badhi hai. Kripya Quality slider kam karein ya "Auto-Fit" button click karein.</span>
                </>
              )}
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              className="w-full h-12 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Optimized Image
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// AGE ELIGIBILITY CALCULATOR COMPONENT
// -------------------------------------------------------------
function AgeCalculatorTool() {
  const [dob, setDob] = useState<string>("");
  const [asOfDate, setAsOfDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [adStatus, setAdStatus] = useState<'loading' | 'filled' | 'unfilled'>('loading');

  const calculateAge = () => {
    if (!dob || !asOfDate) {
      setErrorMsg("Kripya Date of Birth aur Cut-off Date dono enter karein.");
      setResult(null);
      return;
    }

    const birthDate = new Date(dob);
    const cutOff = new Date(asOfDate);

    if (isNaN(birthDate.getTime()) || isNaN(cutOff.getTime())) {
      setErrorMsg("Invalid date entries. Dobara check karein.");
      setResult(null);
      return;
    }

    if (birthDate > cutOff) {
      setErrorMsg("Date of Birth, Cut-off date se baad ki nahi ho sakti.");
      setResult(null);
      return;
    }

    setErrorMsg(null);

    let years = cutOff.getFullYear() - birthDate.getFullYear();
    let months = cutOff.getMonth() - birthDate.getMonth();
    let days = cutOff.getDate() - birthDate.getDate();

    if (days < 0) {
      // Borrow days from the previous month
      months--;
      // Month parameter in Date is 1-indexed, using 0 gives last day of previous month
      const prevMonth = new Date(cutOff.getFullYear(), cutOff.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  // Static Standard eligibility thresholds common in India
  const standardAgeLimits = [
    { title: "MTS & Constable Jobs", range: "18 to 25 Years", check: (y: number) => y >= 18 && y <= 25 },
    { title: "CHSL & Clerical Jobs", range: "18 to 27 Years", check: (y: number) => y >= 18 && y <= 27 },
    { title: "CGL & Inspector Posts", range: "18 to 30 Years", check: (y: number) => y >= 18 && y <= 30 },
    { title: "IAS/IPS & Civil Services", range: "21 to 32 Years", check: (y: number) => y >= 21 && y <= 32 }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8 animate-in fade-in-50">
      <div className={cn(
        "grid grid-cols-1 gap-8 items-stretch w-full transition-all duration-300",
        result ? "md:grid-cols-2" : "max-w-md mx-auto"
      )}>
        
        {/* Date Inputs Panel */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Enter Your Details
            </h3>

            {/* Date of Birth Picker */}
            <div className="space-y-1.5">
              <Label htmlFor="dob" className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground">Date of Birth</Label>
              <div className="relative">
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="rounded-xl h-11 font-bold pl-4 pr-10 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Cut-off Date Picker */}
            <div className="space-y-1.5">
              <Label htmlFor="asOf" className="text-xs uppercase font-extrabold tracking-widest text-muted-foreground">Calculate Age As Of (Cut-off Date)</Label>
              <div className="relative">
                <Input
                  id="asOf"
                  type="date"
                  value={asOfDate}
                  onChange={(e) => setAsOfDate(e.target.value)}
                  className="rounded-xl h-11 font-bold pl-4 pr-10 focus:ring-primary focus:border-primary"
                />
              </div>
              <p className="text-[10px] text-muted-foreground leading-normal">
                Aksar job notifications me cut-off date di jaati hai (e.g., 1st January ya 1st August).
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl leading-tight">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <Button
            onClick={calculateAge}
            className="w-full h-12 rounded-2xl font-bold shadow-lg mt-4"
          >
            Calculate Exact Age & Eligibility
          </Button>
        </div>

        {/* Calculation Result Panel - only visible when result exists */}
        {result && (
          <div className="space-y-6 bg-muted/5 border border-border/40 p-6 rounded-3xl flex flex-col justify-between min-h-[300px] animate-in slide-in-from-right-5 duration-300">
            <div className="space-y-6">
              <h3 className="font-bold text-base">Calculated Age Result</h3>
              
              {/* Massive Age Display */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-4 bg-primary/[0.03] border border-primary/20 rounded-2xl shadow-sm">
                  <span className="text-2xl md:text-3xl font-black text-primary block leading-none">{result.years}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground mt-2 block">Years</span>
                </div>
                <div className="p-4 bg-primary/[0.03] border border-primary/20 rounded-2xl shadow-sm">
                  <span className="text-2xl md:text-3xl font-black text-primary block leading-none">{result.months}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground mt-2 block">Months</span>
                </div>
                <div className="p-4 bg-primary/[0.03] border border-primary/20 rounded-2xl shadow-sm">
                  <span className="text-2xl md:text-3xl font-black text-primary block leading-none">{result.days}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground mt-2 block">Days</span>
                </div>
              </div>

              {/* Dynamic summary text */}
              <p className="text-xs text-muted-foreground leading-relaxed text-center font-medium px-4">
                Aapki aayu cut-off date tak <strong className="text-foreground">{result.years} saal, {result.months} mahine</strong> aur <strong className="text-foreground">{result.days} din</strong> hai.
              </p>

              {/* Standard Eligibility Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-border/30">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">General Age Eligibility Grid</span>
                <div className="space-y-2">
                  {standardAgeLimits.map((limit, idx) => {
                    const eligible = limit.check(result.years);
                    return (
                      <div key={idx} className="flex items-center justify-between text-xs p-2.5 bg-card border rounded-xl shadow-sm">
                        <div className="space-y-0.5">
                          <span className="font-bold text-foreground block">{limit.title}</span>
                          <span className="text-[10px] text-muted-foreground">{limit.range}</span>
                        </div>
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest shrink-0 border",
                          eligible
                            ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                            : "bg-red-500/10 border-red-500/20 text-red-500"
                        )}>
                          {eligible ? "Eligible" : "Not Eligible"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// IMAGE TO PDF CONVERTER & COMPRESSOR COMPONENT
// -------------------------------------------------------------
function PDFConverterTool() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [quality, setQuality] = useState<number>(0.85);
  const [scale, setScale] = useState<number>(0.9);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: PDFFile[] = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substring(7),
        file,
        previewUrl: URL.createObjectURL(file),
        sizeKB: file.size / 1024
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles: PDFFile[] = Array.from(e.dataTransfer.files)
        .filter(file => file.type.startsWith('image/'))
        .map(file => ({
          id: Math.random().toString(36).substring(7),
          file,
          previewUrl: URL.createObjectURL(file),
          sizeKB: file.size / 1024
        }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const target = prev.find(f => f.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter(f => f.id !== id);
    });
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setFiles(prev => {
      const list = [...prev];
      const temp = list[idx];
      list[idx] = list[idx - 1];
      list[idx - 1] = temp;
      return list;
    });
  };

  const moveDown = (idx: number) => {
    if (idx === files.length - 1) return;
    setFiles(prev => {
      const list = [...prev];
      const temp = list[idx];
      list[idx] = list[idx + 1];
      list[idx + 1] = temp;
      return list;
    });
  };

  const compressImage = (file: File, scaleFactor: number, qual: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const targetW = img.width * scaleFactor;
          const targetH = img.height * scaleFactor;
          canvas.width = targetW;
          canvas.height = targetH;
          
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject("Canvas context failure");
            return;
          }
          ctx.drawImage(img, 0, 0, targetW, targetH);
          resolve(canvas.toDataURL("image/jpeg", qual));
        };
        img.onerror = () => reject("Image load failure");
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject("File read failure");
      reader.readAsDataURL(file);
    });
  };

  const generatePDF = async () => {
    if (files.length === 0) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
      });

      const a4Width = doc.internal.pageSize.getWidth();
      const a4Height = doc.internal.pageSize.getHeight();

      for (let i = 0; i < files.length; i++) {
        if (i > 0) doc.addPage();
        const fileObj = files[i];
        
        // Compress and scale image client-side via canvas
        const imgDataUrl = await compressImage(fileObj.file, scale, quality);
        
        // Add compressed JPEG to A4 PDF page fitting the width & height
        doc.addImage(imgDataUrl, "JPEG", 0, 0, a4Width, a4Height, undefined, "FAST");
      }

      doc.save("job_indians_documents.pdf");
    } catch (e) {
      console.error("PDF Generation failed:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    files.forEach(f => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  interface PDFFile {
    id: string;
    file: File;
    previewUrl: string;
    sizeKB: number;
  }

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 md:space-y-8 animate-in fade-in-50">
      
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border/60 hover:border-primary/50 rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 bg-muted/5 group space-y-3 flex flex-col items-center justify-center min-h-[180px]"
      >
        <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-bold text-sm text-foreground">Select Multiple Images or Drag & Drop</p>
          <p className="text-xs text-muted-foreground mt-0.5">Supports JPG, JPEG, PNG. Images will be compiled into a single A4 PDF.</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-t border-border/20 pt-6">
          
          {/* File Lists & Sorting */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
                Uploaded Pages ({files.length})
              </h3>
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs font-bold text-destructive hover:bg-destructive/10">
                Clear All
              </Button>
            </div>

            {/* List scroll area */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {files.map((fileObj, idx) => (
                <div key={fileObj.id} className="flex items-center justify-between p-3 bg-muted/10 border border-border/40 rounded-2xl gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={fileObj.previewUrl} alt="Thumbnail" className="w-10 h-10 object-cover rounded-lg border bg-card" />
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-foreground block truncate">{fileObj.file.name}</span>
                      <span className="text-[10px] text-muted-foreground font-semibold">Page {idx + 1} • {fileObj.sizeKB.toFixed(1)} KB</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => moveUp(idx)} disabled={idx === 0} className="w-8 h-8 rounded-lg">
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => moveDown(idx)} disabled={idx === files.length - 1} className="w-8 h-8 rounded-lg">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(fileObj.id)} className="w-8 h-8 rounded-lg text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compress & Generation settings */}
          <div className="space-y-6 bg-muted/5 border border-border/40 p-6 rounded-3xl">
            <h3 className="font-bold text-base">PDF Optimization</h3>

            {/* Quality Slider */}
            <div className="space-y-3 p-4 bg-card border rounded-2xl">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-muted-foreground">Image Quality</span>
                <span className="text-primary font-extrabold">{Math.round(quality * 100)}%</span>
              </div>
              <Slider
                min={0.1}
                max={1.0}
                step={0.05}
                value={[quality]}
                onValueChange={(val) => setQuality(val[0])}
                className="py-2"
              />
              <p className="text-[10px] text-muted-foreground leading-normal">
                Quality kam karne se final PDF file ka size (KB) bohot kam ho jata hai.
              </p>
            </div>

            {/* Scaling Slider */}
            <div className="space-y-3 p-4 bg-card border rounded-2xl">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-muted-foreground">Image Resolution Scale</span>
                <span className="text-primary font-extrabold">{Math.round(scale * 100)}%</span>
              </div>
              <Slider
                min={0.3}
                max={1.0}
                step={0.05}
                value={[scale]}
                onValueChange={(val) => setScale(val[0])}
                className="py-2"
              />
              <p className="text-[10px] text-muted-foreground leading-normal">
                Scale kam karne se images ke pixels resize ho jaate hain, jisse size aur bhi drop ho jata hai.
              </p>
            </div>

            {/* Compile PDF Button */}
            <Button
              onClick={generatePDF}
              disabled={isGenerating || files.length === 0}
              className="w-full h-12 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Compressed PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Compile & Download PDF
                </>
              )}
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}
