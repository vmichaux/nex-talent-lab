import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, Send } from "lucide-react";

export default function ContactSalesPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    preferEmail: true,
    preferPhone: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call to submit form
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: "Message sent!",
        description: "Our sales team will contact you shortly."
      });
      setIsSubmitting(false);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        preferEmail: true,
        preferPhone: false
      });
    }, 1500);
  };

  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          {/* Background Pattern - Purple Gradient */}
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 py-[64px]">
              <div className="mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">We are Here for You</div>
              
              <h1 id="sales-title" className="mb-4 text-3xl font-bold tracking-tight md:text-5xl custom-gradient-text">
                Contact Our Sales Team
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
                Have questions about our pricing, features, or need a custom solution? Our sales team is here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-muted/50 p-6 rounded-lg h-full">
                  <h2 className="text-2xl font-semibold mb-4 py-[26px]">Why Contact Sales?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <span className="text-primary text-lg">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Custom Pricing</h3>
                        <p className="text-muted-foreground">Get custom pricing tailored to your organization's needs.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <span className="text-primary text-lg">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Enterprise Solutions</h3>
                        <p className="text-muted-foreground">Learn about our enterprise-grade features and support.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <span className="text-primary text-lg">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Personalized Demo</h3>
                        <p className="text-muted-foreground">Schedule a demo customized to your specific requirements.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-3">
                <Card className="border-muted/40 shadow-md">
                  <CardHeader>
                    <CardTitle className="my-0 py-[25px]">Get in Touch</CardTitle>
                    <CardDescription>
                      Fill out the form below and our sales team will get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                            <Input id="firstName" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                            <Input id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                            <Input id="email" name="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" type="tel" placeholder="+1 (123) 456-7890" value={formData.phone} onChange={handleChange} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                          <Textarea id="message" name="message" placeholder="Tell us about your requirements or questions" rows={5} value={formData.message} onChange={handleChange} required className="resize-none" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="px-[2px]">Preferred Contact Method <span className="text-destructive">*</span></Label>
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="preferEmail" checked={formData.preferEmail} onCheckedChange={checked => handleCheckboxChange("preferEmail", checked as boolean)} />
                              <Label htmlFor="preferEmail" className="font-normal flex items-center gap-1.5">
                                <Mail className="h-4 w-4" /> Email
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="preferPhone" checked={formData.preferPhone} onCheckedChange={checked => handleCheckboxChange("preferPhone", checked as boolean)} />
                              <Label htmlFor="preferPhone" className="font-normal flex items-center gap-1.5">
                                <Phone className="h-4 w-4" /> Phone
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting} onClick={handleSubmit}>
                      {isSubmitting ? <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Sending...
                        </span> : <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
}
