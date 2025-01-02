import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorAlertProps {
  message: string;
}

export const LoadingPlaceholder = () => (
  <div className="w-full bg-gray-100 p-4 rounded-lg">
    <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
  </div>
);

export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <Alert variant="destructive" className="border border-red-200 bg-white">
    <div className="flex gap-3">
      <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
      <div className="flex flex-col gap-1">
        <h3 className="font-medium text-red-500">Error</h3>
        <AlertDescription className="text-red-500">{message}</AlertDescription>
      </div>
    </div>
  </Alert>
);

export const AudioContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full bg-gray-100 p-4 rounded-lg">
    <div className="relative">{children}</div>
  </div>
);
