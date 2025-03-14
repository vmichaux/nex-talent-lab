
import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { submitContactForm, checkContactCollection } from "@/lib/contactService";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  preferEmail: boolean;
  preferPhone: boolean;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    preferEmail: true,
    preferPhone: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Check if we can access the collection
      const collectionAccessible = await checkContactCollection();
      if (!collectionAccessible) {
        toast({
          title: "Service unavailable",
          description: "Contact form service is currently unavailable. Please try again later.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Submit to Firebase
      const result = await submitContactForm(formData);
      
      if (result) {
        toast({
          title: "Message sent!",
          description: "Our sales team will contact you shortly."
        });
        
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
      } else {
        throw new Error("Failed to submit contact form");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
  );
};

export default ContactForm;
