import { Libre_Baskerville, Plus_Jakarta_Sans } from "next/font/google";
import { FormProvider } from "@/components/form/FormContext";
import { FormWrapper } from '@/components/form/FormWrapper';

const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-libre-baskerville",
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
});

export default function PostulaPage() {
    return (
        <FormProvider>
            <main className={`${libreBaskerville.variable} ${plusJakartaSans.variable} w-full min-h-screen bg-[#FAF7F2] font-sans m-0 p-0`}>
                <FormWrapper />
            </main>
        </FormProvider >
    );
}
