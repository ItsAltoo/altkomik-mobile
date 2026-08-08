import { useState } from "react"
import * as FileSystem from "expo-file-system/legacy"
import * as Sharing from "expo-sharing"
import * as DocumentPicker from "expo-document-picker"
import Toast from "react-native-toast-message"
import { Platform } from "react-native"
import { useReadingHistory } from "@/src/libs/store/useReadingHistory"

const validateHistoryData = (parsedData: any) => {
  if (typeof parsedData !== "object" || parsedData === null || Array.isArray(parsedData)) {
    throw new Error("Invalid format")
  }

  const keys = Object.keys(parsedData)
  if (keys.length > 0) {
    const firstKey = keys[0]
    const sample = parsedData[firstKey]
    if (!sample || typeof sample !== "object" || !Array.isArray(sample.readChapters)) {
      throw new Error("Invalid structure")
    }
  }
  return true
}

export const useBackupRestore = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const history = useReadingHistory((state) => state.history)
  const replaceHistory = useReadingHistory((state) => state.replaceHistory)

  const exportHistory = async () => {
    try {
      setIsExporting(true)

      const isAvailable = await Sharing.isAvailableAsync()
      if (!isAvailable) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Fitur berbagi tidak tersedia di perangkat ini",
        })
        return
      }

      const timestamp = new Date().toISOString().split("T")[0]
      const filename = `altkomik_history_backup_${timestamp}.json`
      const jsonString = JSON.stringify(history, null, 2)

      // Untuk Android, kita bisa menggunakan Storage Access Framework agar langsung bisa di save ke File Manager (Internal Storage)
      if (Platform.OS === "android") {
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

        if (permissions.granted) {
          // Buat file di direktori pilihan user
          const newFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            "application/json",
          )

          await FileSystem.writeAsStringAsync(newFileUri, jsonString, {
            encoding: FileSystem.EncodingType.UTF8,
          })

          Toast.show({
            type: "success",
            text1: "Berhasil",
            text2: "Riwayat bacaan berhasil disimpan ke folder pilihan Anda",
          })
          return
        } else {
          // Jika user membatalkan (cancel) pemilihan folder, batalkan proses ekspor
          return
        }
      }

      // Fallback untuk iOS menggunakan fitur Sharing bawaan (Share Sheet -> Save to Files)
      const fileUri = `${FileSystem.cacheDirectory}${filename}`
      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      })

      await Sharing.shareAsync(fileUri, {
        mimeType: "application/json",
        dialogTitle: "Save Reading History Backup",
      })

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Riwayat bacaan berhasil diekspor",
      })
    } catch (error) {
      console.error("Export Error:", error)
      Toast.show({
        type: "error",
        text1: "Gagal Ekspor",
        text2: "Terjadi kesalahan saat mengekspor riwayat Anda",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const importHistory = async () => {
    try {
      setIsImporting(true)

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      })

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return // User canceled
      }

      const file = result.assets[0]
      const fileContent = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.UTF8,
      })

      let parsedData: any
      try {
        parsedData = JSON.parse(fileContent)
      } catch (e) {
        Toast.show({
          type: "error",
          text1: "File Tidak Valid",
          text2: "File yang dipilih bukan dokumen JSON yang sah",
        })
        return
      }

      // Validasi struktur JSON hasil impor
      validateHistoryData(parsedData)

      // Jika valid, timpa history yang ada
      replaceHistory(parsedData)

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Riwayat bacaan berhasil dipulihkan!",
      })
    } catch (error) {
      console.error("Import Error:", error)
      Toast.show({
        type: "error",
        text1: "Gagal Impor",
        text2: "File rusak atau memiliki struktur yang tidak valid",
      })
    } finally {
      setIsImporting(false)
    }
  }

  return {
    exportHistory,
    importHistory,
    isExporting,
    isImporting,
  }
}
