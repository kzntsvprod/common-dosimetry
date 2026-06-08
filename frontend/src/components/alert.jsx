import { AlertCircle, Clock, X } from 'lucide-react';

const Alert = ({ type = 'error', title, message, onClose }) => {
   if (!message) return null;

   const config = {
      error: {
         wrapperClass:
            'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800/50',
         iconClass: 'text-red-500',
         titleClass: 'text-red-800 dark:text-red-300',
         textClass: 'text-red-600 dark:text-red-400',
         buttonClass:
            'text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50',
         Icon: AlertCircle,
         iconPulse: false,
      },
      warning: {
         wrapperClass:
            'border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800/50',
         iconClass: 'text-orange-500',
         titleClass: 'text-orange-800 dark:text-orange-300',
         textClass: 'text-orange-600 dark:text-orange-400',
         buttonClass:
            'text-orange-400 hover:text-orange-600 dark:text-orange-500 dark:hover:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/50',
         Icon: Clock,
         iconPulse: true,
      },
   };

   const currentConfig = config[type] || config.error;
   const { Icon } = currentConfig;

   return (
      <div
         className={`p-4 rounded-lg border flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-2 duration-300 ${currentConfig.wrapperClass}`}
      >
         <Icon
            className={`w-5 h-5 shrink-0 mt-0.5 ${currentConfig.iconClass} ${currentConfig.iconPulse ? 'animate-pulse' : ''}`}
         />
         <div className="flex-1">
            <h4 className={`text-sm font-semibold ${currentConfig.titleClass}`}>
               {title}
            </h4>
            <p className={`text-sm mt-1 ${currentConfig.textClass}`}>
               {message}
            </p>
         </div>
         {onClose && (
            <button
               onClick={onClose}
               className={`transition-colors rounded-full p-1 ${currentConfig.buttonClass}`}
               aria-label="Закрити сповіщення"
            >
               <X className="w-4 h-4" />
            </button>
         )}
      </div>
   );
};

export default Alert;
