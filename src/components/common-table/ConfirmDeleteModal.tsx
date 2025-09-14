import * as React from "react";
import { Button } from "../ui/button";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "../ui/dialog";

interface ConfirmDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

export function ConfirmDeleteModal({ open, onConfirm, onCancel, title = "Confirm Deletion", description = "Are you sure you want to delete this item? This action cannot be undone.", }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={open => { if (!open) onCancel(); }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-2">
          <AlertTriangle className="text-destructive w-10 h-10" />
          <DialogDescription className="text-center text-base text-foreground">
            {description}
          </DialogDescription>
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Delete
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
