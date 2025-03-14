
import { useProfileForm } from "@/hooks/useProfileForm";
import { useAuth } from "@/hooks/use-auth";
import { ProfilePageLayout } from "@/components/profile/ProfilePageLayout";
import { ProfileLoadingState } from "@/components/profile/ProfileLoadingState";
import { ProfileRoleTabs } from "@/components/profile/ProfileRoleTabs";
import { ProfileFormContainer } from "@/components/profile/ProfileFormContainer";
import { BasicInfo } from "@/components/profile/BasicInfo";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { EducationSection } from "@/components/profile/EducationSection";
import { ExperienceSection } from "@/components/profile/ExperienceSection";
import { InterestsSection } from "@/components/profile/InterestsSection";
import { BusinessInfo } from "@/components/profile/BusinessInfo";

const ProfileEditPage = () => {
  const { currentUser } = useAuth();
  const {
    profile,
    activeRole,
    loading,
    isProfileCompleted,
    handleInputChange,
    handleBusinessChange,
    handleSkillNameChange,
    handleSkillLevelChange,
    addSkill,
    removeSkill,
    handleEducationChange,
    addEducation,
    handleExperienceChange,
    addExperience,
    handleRoleChange,
    handleAddInterest,
    handleRemoveInterest,
    handleSaveProfile
  } = useProfileForm();

  // Content for talent profile tab
  const TalentProfileContent = () => (
    <ProfileFormContainer onSave={handleSaveProfile} isProfileCompleted={isProfileCompleted}>
      <BasicInfo 
        profile={profile} 
        currentUserId={currentUser?.uid || ''} 
        onInputChange={handleInputChange} 
      />
      
      <SkillsSection 
        skills={profile.skills}
        onSkillNameChange={handleSkillNameChange}
        onSkillLevelChange={handleSkillLevelChange}
        addSkill={addSkill}
        removeSkill={removeSkill}
      />
      
      <EducationSection 
        education={profile.education}
        onEducationChange={handleEducationChange}
        addEducation={addEducation}
      />
      
      <ExperienceSection 
        experience={profile.experience}
        onExperienceChange={handleExperienceChange}
        addExperience={addExperience}
      />
      
      <InterestsSection 
        interests={profile.interests}
        onAddInterest={handleAddInterest}
        onRemoveInterest={handleRemoveInterest}
      />
    </ProfileFormContainer>
  );

  // Content for builder profile tab
  const BuilderProfileContent = () => (
    <ProfileFormContainer onSave={handleSaveProfile} isProfileCompleted={isProfileCompleted}>
      <BasicInfo 
        profile={profile} 
        currentUserId={currentUser?.uid || ''} 
        onInputChange={handleInputChange} 
      />
      
      <BusinessInfo 
        business={profile.business}
        onBusinessChange={handleBusinessChange}
      />
      
      <InterestsSection 
        interests={profile.interests}
        onAddInterest={handleAddInterest}
        onRemoveInterest={handleRemoveInterest}
      />
    </ProfileFormContainer>
  );

  // Content for dual role profile tab
  const DualRoleProfileContent = () => (
    <ProfileFormContainer onSave={handleSaveProfile} isProfileCompleted={isProfileCompleted}>
      <BasicInfo 
        profile={profile} 
        currentUserId={currentUser?.uid || ''} 
        onInputChange={handleInputChange} 
      />
      
      <BusinessInfo 
        business={profile.business}
        onBusinessChange={handleBusinessChange}
      />
      
      <SkillsSection 
        skills={profile.skills}
        onSkillNameChange={handleSkillNameChange}
        onSkillLevelChange={handleSkillLevelChange}
        addSkill={addSkill}
        removeSkill={removeSkill}
      />
      
      <EducationSection 
        education={profile.education}
        onEducationChange={handleEducationChange}
        addEducation={addEducation}
      />
      
      <ExperienceSection 
        experience={profile.experience}
        onExperienceChange={handleExperienceChange}
        addExperience={addExperience}
      />
      
      <InterestsSection 
        interests={profile.interests}
        onAddInterest={handleAddInterest}
        onRemoveInterest={handleRemoveInterest}
      />
    </ProfileFormContainer>
  );

  return (
    <ProfilePageLayout 
      title="Manage My Profile"
      subtitle={isProfileCompleted 
        ? "Update your information to keep your profile current and relevant."
        : "Tell us about yourself so we can match you with the right opportunities."}
      isProfileCompleted={isProfileCompleted}
    >
      {loading ? (
        <ProfileLoadingState />
      ) : (
        <div className="max-w-3xl mx-auto">
          <ProfileRoleTabs 
            activeRole={activeRole}
            onRoleChange={handleRoleChange}
            talentContent={<TalentProfileContent />}
            builderContent={<BuilderProfileContent />}
            dualContent={<DualRoleProfileContent />}
          />
        </div>
      )}
    </ProfilePageLayout>
  );
};

export default ProfileEditPage;
