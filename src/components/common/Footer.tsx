const Footer = () => { 
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black font-semibold p-4 text-center text-sm">
      Copyright © {currentYear} - All right reserved by NexPhere Solutions
    </footer>
  );
};

export default Footer;