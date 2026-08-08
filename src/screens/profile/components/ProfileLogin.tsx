import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { DiscordIcon } from "@/src/components/icons/DiscordIcon"
import { createIcon } from "@gluestack-ui/core/icon/creator"
import { Image } from "expo-image"
import { Link } from "expo-router"
import { Path, Svg } from "react-native-svg"

const gotouMascot = require("@/assets/mascot/Gotou.png")

const GoogleIcon = createIcon({
  Root: Svg,
  viewBox: "0 0 20 20",
  path: (
    <>
      <Path
        d="M19.805 10.2302C19.805 9.55044 19.7499 8.86699 19.6323 8.19824H10.2V12.0491H15.6015C15.3773 13.291 14.6571 14.3897 13.6026 15.0878V17.5864H16.825C18.7174 15.8448 19.805 13.2726 19.805 10.2302Z"
        fill="#4285F4"
        stroke="#4285F4"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <Path
        d="M10.2 20.0008C12.897 20.0008 15.1715 19.1152 16.8287 17.5867L13.6062 15.088C12.7096 15.698 11.5522 16.0434 10.2037 16.0434C7.5948 16.0434 5.38279 14.2833 4.58911 11.917H1.26373V14.4928C2.96133 17.8696 6.41898 20.0008 10.2 20.0008Z"
        fill="#34A853"
        stroke="#34A853"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <Path
        d="M4.58546 11.9172C4.16657 10.6753 4.16657 9.33044 4.58546 8.08848V5.5127H1.26376C-0.154572 8.33834 -0.154572 11.6674 1.26376 14.493L4.58546 11.9172Z"
        fill="#FBBC04"
        stroke="#FBBC04"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <Path
        d="M10.2 3.95805C11.6257 3.936 13.0036 4.47247 14.0361 5.45722L16.8911 2.60218C15.0833 0.904587 12.6839 -0.0287217 10.2 0.000673888C6.41898 0.000673888 2.96133 2.13185 1.26373 5.51234L4.58543 8.08813C5.37544 5.71811 7.59113 3.95805 10.2 3.95805Z"
        fill="#EA4335"
        stroke="#EA4335"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </>
  ),
})

const TwitterIcon = createIcon({
  Root: Svg,
  viewBox: "0 0 24 24",
  path: (
    <Path
      fill="#000000"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    />
  ),
})

type ProfileLoginProps = {
  isLoading: boolean
  handleGoogleLogin: () => Promise<void>
}

export const ProfileLogin = ({ isLoading, handleGoogleLogin }: ProfileLoginProps) => {
  return (
    <VStack space="xl" className="h-screen flex-1 items-center justify-center px-4">
      <Image source={gotouMascot} style={{ width: 150, height: 150, marginBottom: -16 }} contentFit="contain" />
      <VStack space="sm" className="items-center">
        <Text className="text-center text-xl font-bold text-typography-900">Masuk ke Akun Anda</Text>
        <Text className="text-center text-typography-500">
          Masuk untuk menyimpan riwayat bacaan, mengelola bookmark, dan mengakses fitur lainnya.
        </Text>
      </VStack>

      <VStack space="md" className="mt-6 w-full">
        <Button
          size="xl"
          onPress={handleGoogleLogin}
          disabled={isLoading}
          className="h-14 w-full flex-row items-center justify-center rounded-xl border border-outline-200 bg-white shadow-soft-2  active:bg-white"
        >
          {isLoading ? (
            <ButtonSpinner />
          ) : (
            <HStack space="sm" className="items-center">
              <ButtonIcon as={GoogleIcon} size="lg" />
              <ButtonText className="font-bold text-black">Google</ButtonText>
            </HStack>
          )}
        </Button>

        <Button
          size="xl"
          disabled={true}
          className="h-14 w-full flex-row items-center justify-center rounded-xl border border-outline-200 bg-white/80 shadow-soft-2 active:opacity-80"
        >
          <HStack space="sm" className="items-center">
            <ButtonIcon as={DiscordIcon} size="lg" />
            <ButtonText className="font-bold text-black">Discord</ButtonText>
          </HStack>
        </Button>

        <Button
          size="xl"
          disabled={true}
          className="h-14 w-full flex-row items-center justify-center rounded-xl border border-outline-200 bg-white/80 shadow-soft-2 active:opacity-80"
        >
          <HStack space="sm" className="items-center">
            <ButtonIcon as={TwitterIcon} size="lg" />
            <ButtonText className="font-bold text-black">Twitter</ButtonText>
          </HStack>
        </Button>
      </VStack>

      <Text className="mt-8 text-center text-sm text-typography-500">
        Dengan masuk, Anda menyetujui{" "}
        <Link href="/terms" asChild>
          <Text className="font-semibold text-primary-500 underline">Ketentuan Layanan</Text>
        </Link>{" "}
        dan{" "}
        <Link href="/privacy" asChild>
          <Text className="font-semibold text-primary-500 underline">Kebijakan Privasi</Text>
        </Link>{" "}
        kami.
      </Text>
    </VStack>
  )
}
