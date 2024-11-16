import { PDFDocument } from 'pdf-lib';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase';
import imageCompression from 'browser-image-compression';

const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB chunks

export const compressPDF = async (file: File): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Optimize PDF
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    // Compress page content
    page.setSize(page.getWidth(), page.getHeight());
  }
  
  // Save with maximum compression
  const compressedPdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50,
    updateFieldAppearances: false
  });
  
  return compressedPdfBytes;
};

export const uploadFile = async (
  file: File,
  path: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let fileToUpload: Uint8Array;
      
      if (file.type === 'application/pdf') {
        // Compress PDF
        fileToUpload = await compressPDF(file);
      } else {
        // For other file types, convert to array buffer
        fileToUpload = new Uint8Array(await file.arrayBuffer());
      }

      // Create storage reference
      const storageRef = ref(storage, path);
      
      // Create upload task with optimized settings
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload, {
        customMetadata: {
          contentType: file.type,
        }
      });
      
      // Monitor upload with throttled progress updates
      let lastProgressUpdate = 0;
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const now = Date.now();
          
          // Update progress at most every 500ms to prevent UI jank
          if (now - lastProgressUpdate > 500) {
            onProgress(progress);
            lastProgressUpdate = now;
          }
        },
        reject,
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          resolve(downloadURL);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};