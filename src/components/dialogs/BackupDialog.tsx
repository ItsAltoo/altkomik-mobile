import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button"

import { Text } from "@/components/ui/text"
import { Icon } from "@/components/ui/icon"
import { Download, Upload, AlertTriangle } from "lucide-react-native"
import { useBackupRestore } from "@/src/screens/profile/hooks/useBackupRestore"

type BackupDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export const BackupDialog = ({ isOpen, onClose }: BackupDialogProps) => {
  const { exportHistory, importHistory, isExporting, isImporting } = useBackupRestore()
  const [showWarning, setShowWarning] = useState(false)

  const handleExport = async () => {
    await exportHistory()
    onClose()
  }

  const handleClose = () => {
    setShowWarning(false)
    onClose()
  }

  const handleConfirmImport = async () => {
    await importHistory()
    handleClose()
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={handleClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent className="bg-background-0">
        {showWarning ? (
          <>
            <AlertDialogHeader>
              <Text className="flex-row items-center text-lg font-bold text-typography-900">
                <Icon as={AlertTriangle} className="mr-2 text-warning-500" />
                Peringatan Import
              </Text>
            </AlertDialogHeader>
            <AlertDialogBody className="mb-4 mt-3">
              <Text size="sm" className="text-typography-500">
                Mengimpor data backup akan menimpa (overwrite) seluruh riwayat bacaan Anda saat ini di perangkat ini.
                Apakah Anda yakin ingin melanjutkan?
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter className="w-full flex-row justify-end gap-2">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => setShowWarning(false)}
                size="sm"
                className="rounded-lg"
              >
                <ButtonText>Batal</ButtonText>
              </Button>
              <Button
                action="primary"
                onPress={handleConfirmImport}
                isDisabled={isImporting}
                size="sm"
                className="rounded-lg bg-primary-500 active:bg-primary-600"
              >
                {isImporting && <ButtonSpinner />}
                <ButtonText>Ya, Import</ButtonText>
              </Button>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <Text className="text-lg font-bold text-typography-900">Backup & Restore History</Text>
            </AlertDialogHeader>
            <AlertDialogBody className="mb-4 mt-3">
              <Text size="sm" className="mb-2 text-typography-500">
                Amankan riwayat bacaan komik Anda ke dalam file (Ekspor), atau pulihkan riwayat bacaan Anda dari file
                backup sebelumnya (Impor).
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter className="w-full flex-row justify-end gap-2">
              <Button variant="outline" action="secondary" onPress={handleClose} size="sm" className="rounded-lg">
                <ButtonText>Batal</ButtonText>
              </Button>
              <Button
                action="secondary"
                variant="solid"
                onPress={handleExport}
                isDisabled={isExporting}
                size="sm"
                className="rounded-lg bg-primary-500 active:bg-primary-600"
              >
                {isExporting ? <ButtonSpinner /> : <Icon as={Upload} className="mr-1 text-typography-0" size="sm" />}
                <ButtonText className="text-typography-0">Ekspor</ButtonText>
              </Button>
              <Button
                action="secondary"
                variant="outline"
                onPress={() => setShowWarning(true)}
                size="sm"
                className="rounded-lg border-primary-500"
              >
                <Icon as={Download} className="mr-1 text-primary-500" size="sm" />
                <ButtonText className="text-primary-500">Impor</ButtonText>
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
