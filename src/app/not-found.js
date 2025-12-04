import Custom404 from "@/Components/404-page/Custom404";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";


export default function Page() {


  return (
    <div>
      <Navbar />
    
    <Custom404/>
 
      <Footer />
    </div>
  )
}