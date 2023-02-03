import Navbar from "../components/LandingNavbar";
import Footer from "../components/LandingFooter";
import SignaturePad from "../components/SignaturePad";

export default function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", margin: 100, gap: 100 }}>
        <div style={{ flex: 3 }}>
          <h1 style={{ fontSize: 24 }}>What is esignees?</h1>
          <p>
            esignees is an application developed to help improve
            business-to-business relations. Users can use our application to
            upload, send, and request signatures from other users. Through the
            help of esignees, users can feel safe knowing that the documents
            they uploaded and requested are secure through our validation
            system.{" "}
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <img
            src="https://media.istockphoto.com/id/1156740048/vector/dashboard-great-design-for-any-site-purposes-business-infographic-template-vector-flat.jpg?s=612x612&w=0&k=20&c=0fPeh8a9ODDMvPk-3o9g5F-JRpt8d2lWIKCrXf_Yjv8="
            alt="a"
            style={{ borderRadius: 15 }}
          />
        </div>
      </div>
      <div style={{ display: "flex", margin: 100, gap: 100 }}>
        <div style={{ flex: 3 }}>
          <img
            src="https://media.istockphoto.com/id/1156740048/vector/dashboard-great-design-for-any-site-purposes-business-infographic-template-vector-flat.jpg?s=612x612&w=0&k=20&c=0fPeh8a9ODDMvPk-3o9g5F-JRpt8d2lWIKCrXf_Yjv8="
            alt="b"
            style={{ borderRadius: 15 }}
          />
        </div>
        <div style={{ flex: 3 }}>
          <h1 style={{ fontSize: 24 }}>How does it work?</h1>
          <p>
            esignees is an application developed to help improve
            business-to-business relations. Users can use our application to
            upload, send, and request signatures from other users. Through the
            help of esignees, users can feel safe knowing that the documents
            they uploaded and requested are secure through our validation
            system.{" "}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", margin: 100, gap: 100 }}>
        <div style={{ flex: 3 }}>
          <h1 style={{ fontSize: 24 }}>Why should I use esignees?</h1>
          <p>
            esignees is an application developed to help improve
            business-to-business relations. Users can use our application to
            upload, send, and request signatures from other users. Through the
            help of esignees, users can feel safe knowing that the documents
            they uploaded and requested are secure through our validation
            system.{" "}
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <img
            src="https://media.istockphoto.com/id/1156740048/vector/dashboard-great-design-for-any-site-purposes-business-infographic-template-vector-flat.jpg?s=612x612&w=0&k=20&c=0fPeh8a9ODDMvPk-3o9g5F-JRpt8d2lWIKCrXf_Yjv8="
            alt="c"
            style={{ borderRadius: 15 }}
          />
        </div>
      </div>
      <SignaturePad />
      <Footer />
    </div>
  );
}
