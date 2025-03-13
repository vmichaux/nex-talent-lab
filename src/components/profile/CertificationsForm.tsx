
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Plus } from "lucide-react";
import { Certification } from "@/types/profile";

interface CertificationsFormProps {
  certifications: Certification[];
  handleCertificationChange: (index: number, field: string, value: string) => void;
  addCertification: () => void;
  removeCertification: (index: number) => void;
}

const CertificationsForm = ({
  certifications,
  handleCertificationChange,
  addCertification,
  removeCertification
}: CertificationsFormProps) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        Certifications & Licenses
      </h3>
      <div className="space-y-6 mb-6">
        {certifications.map((cert, index) => (
          <div key={`cert-${index}`} className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-name-${index}`} className="text-sm font-medium">
                  Certification Name
                </Label>
                <Input
                  id={`cert-name-${index}`}
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                  placeholder="e.g., AWS Solutions Architect"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`cert-issuer-${index}`} className="text-sm font-medium">
                  Issuing Organization
                </Label>
                <Input
                  id={`cert-issuer-${index}`}
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                  placeholder="e.g., Amazon Web Services"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`cert-date-${index}`} className="text-sm font-medium">
                  Date Obtained
                </Label>
                <Input
                  id={`cert-date-${index}`}
                  type="text"
                  value={cert.dateObtained}
                  onChange={(e) => handleCertificationChange(index, "dateObtained", e.target.value)}
                  placeholder="MM/YYYY"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`cert-expiry-${index}`} className="text-sm font-medium">
                  Expiration Date (Optional)
                </Label>
                <Input
                  id={`cert-expiry-${index}`}
                  type="text"
                  value={cert.expirationDate || ""}
                  onChange={(e) => handleCertificationChange(index, "expirationDate", e.target.value)}
                  placeholder="MM/YYYY or Never"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`cert-link-${index}`} className="text-sm font-medium">
                Verification Link (Optional)
              </Label>
              <Input
                id={`cert-link-${index}`}
                type="text"
                value={cert.verificationLink || ""}
                onChange={(e) => handleCertificationChange(index, "verificationLink", e.target.value)}
                placeholder="https://..."
                className="w-full"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => removeCertification(index)} 
                variant="outline" 
                size="sm" 
                className="px-2"
                type="button"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        <Button 
          onClick={addCertification} 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap"
          type="button"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Certification
        </Button>
      </div>
    </div>
  );
};

export default CertificationsForm;
