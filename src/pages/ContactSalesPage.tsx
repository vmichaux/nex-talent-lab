
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ContactPageHeader from "@/components/contact/ContactPageHeader";
import ContactBenefits from "@/components/contact/ContactBenefits";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactSalesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <ContactPageHeader />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <ContactBenefits />
              </div>

              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
