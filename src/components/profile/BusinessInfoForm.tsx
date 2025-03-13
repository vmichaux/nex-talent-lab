
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building, Calendar, Users, Tag, FileText, CreditCard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BusinessInfoFormProps {
  business: {
    companyName: string;
    foundedYear: string;
    description: string;
    employees: string;
    industry: string;
    projectNeeds: string;
    billingDetails: string;
  };
  handleBusinessChange: (field: string, value: string) => void;
}

const BusinessInfoForm = ({ business, handleBusinessChange }: BusinessInfoFormProps) => {
  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Building className="h-5 w-5 text-primary" />
        Business Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              value={business.companyName}
              onChange={(e) => handleBusinessChange("companyName", e.target.value)}
              placeholder="Acme Inc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foundedYear" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Year Founded
              </div>
            </Label>
            <Input
              id="foundedYear"
              type="text"
              value={business.foundedYear}
              onChange={(e) => handleBusinessChange("foundedYear", e.target.value)}
              placeholder="2015"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employees" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Employees
              </div>
            </Label>
            <Select
              value={business.employees}
              onValueChange={(value) => handleBusinessChange("employees", value)}
            >
              <SelectTrigger id="employees" className="w-full">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1</SelectItem>
                <SelectItem value="1-10">1-10</SelectItem>
                <SelectItem value="10-50">10-50</SelectItem>
                <SelectItem value="50-200">50-200</SelectItem>
                <SelectItem value="200+">200+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Industry
              </div>
            </Label>
            <Input
              id="industry"
              type="text"
              value={business.industry}
              onChange={(e) => handleBusinessChange("industry", e.target.value)}
              placeholder="Technology, Healthcare, Education, etc."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessDescription" className="text-sm font-medium">
              Company Description
            </Label>
            <Textarea
              id="businessDescription"
              value={business.description}
              onChange={(e) => handleBusinessChange("description", e.target.value)}
              placeholder="Tell us about your business..."
              rows={3}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectNeeds" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Project Needs
              </div>
            </Label>
            <Textarea
              id="projectNeeds"
              value={business.projectNeeds}
              onChange={(e) => handleBusinessChange("projectNeeds", e.target.value)}
              placeholder="Describe the types of projects or talent you're looking for..."
              rows={3}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="billingDetails" className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Billing Details
              </div>
            </Label>
            <Textarea
              id="billingDetails"
              value={business.billingDetails}
              onChange={(e) => handleBusinessChange("billingDetails", e.target.value)}
              placeholder="Add information for payments and invoicing..."
              rows={3}
              className="min-h-[80px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoForm;
