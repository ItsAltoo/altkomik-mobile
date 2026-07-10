import { Text } from "@/components/ui/text"
import { Button, ButtonText } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"

type LogoutDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogoutDialog = ({ isOpen, onClose, onConfirm }: LogoutDialogProps) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent className="p-4">
        <AlertDialogHeader>
          <Text className="text-lg font-semibold text-typography-950">Keluar dari Akun</Text>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-4 mt-3" contentContainerClassName="mb-4">
          <Text size="sm" className="text-typography-500">
            Apakah Anda yakin ingin keluar? Anda harus masuk kembali untuk melihat riwayat bacaan dan bookmark.
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button variant="outline" action="secondary" onPress={onClose} size="sm">
            <ButtonText>Batal</ButtonText>
          </Button>
          <Button
            size="sm"
            action="negative"
            onPress={() => {
              onClose()
              onConfirm()
            }}
          >
            <ButtonText>Ya, Keluar</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
