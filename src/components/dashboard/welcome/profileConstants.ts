
export const getWelcomeMessages = (firstName: string = "") => ({
  talent: `Let's go ${firstName}! Welcome to Your Talent Journey`,
  builder: `Let's go ${firstName}! Welcome to Your Builder Journey`,
  both: `Let's go ${firstName}! Welcome to Your Dual Journey`
});

export const descriptions = {
  talent: "Let's showcase your skills and find the perfect projects",
  builder: "Let's find the right talent for your projects",
  both: "Let's connect you with projects and talents"
};
