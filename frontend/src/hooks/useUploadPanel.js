import { useRef, useState, useEffect } from 'react';

export const useUploadPanel = (onUpload) => {
   const fileInputRef = useRef(null);
   const [isDragging, setIsDragging] = useState(false);
   const [error, setError] = useState(null);

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

   const validateAndUpload = (file) => {
      setError(null);
      if (!file) return;

      if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
         onUpload(file);
      } else {
         setError('Будь ласка, завантажте файл у форматі .csv або .txt!');
      }

      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      validateAndUpload(file);
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
      validateAndUpload(file);
   };

   return {
      fileInputRef,
      isDragging,
      error,
      setError,
      handleDivClick,
      handleFileChange,
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
   };
};
