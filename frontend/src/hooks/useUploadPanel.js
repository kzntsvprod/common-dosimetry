import { useRef, useState, useEffect } from 'react';

export const useUploadPanel = (onUpload) => {
   const fileInputRef = useRef(null);
   const [isDragging, setIsDragging] = useState(false);

   useEffect(() => {
      const preventDefaultBehavior = (e) => {
         e.preventDefault();
      };

      window.addEventListener('dragover', preventDefaultBehavior);
      window.addEventListener('drop', preventDefaultBehavior);

      return () => {
         window.removeEventListener('dragover', preventDefaultBehavior);
         window.removeEventListener('drop', preventDefaultBehavior);
      };
   }, []);

   const handleDivClick = () => {
      fileInputRef.current.click();
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         onUpload(file);
      }
   };

   const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
   };

   const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
   };

   const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.currentTarget.contains(e.relatedTarget)) {
         setIsDragging(false);
      }
   };

   const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer?.files[0];

      if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
         onUpload(file);
      } else if (file) {
         alert('Будь ласка, завантажте файл у форматі .csv або .txt');
      }
   };

   return {
      fileInputRef,
      isDragging,
      handleDivClick,
      handleFileChange,
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
   };
};
