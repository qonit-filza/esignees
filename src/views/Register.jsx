export default function Register() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 4.5,
          backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url("https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?cs=srgb&dl=pexels-pixabay-48148.jpg&fm=jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        style={{
          flex: 1.5,
          height: "100vh",
          borderLeft: "solid",
          borderColor: "white",
          backgroundColor: "#0A1C62",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            paddingTop: "20vh",
            paddingBottom: "20vh",
            fontSize: 26,
            fontWeight: "bold",
            color: "white",
          }}
        >
          esignees/ LOGO IMG(?)
        </h1>
        <form
          style={{
            border: "solid",
            borderColor: "white",
            borderRadius: 15,
            padding: 25,
            marginLeft: 25,
            marginRight: 25,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            height: "50vh",
          }}
        >
          <h2 style={{ textAlign: "center" }}>SIGN UP</h2>
          <br />
          <br />
          <p>Username:</p>
          <input
            type="text"
            placeholder="Username"
            style={{
              border: "solid",
              borderRadius: 5,
              borderColor: "black",
              paddingLeft: 10,
              width: "100%",
              height: 35,
            }}
          />
          <p>Email:</p>
          <input
            type="email"
            placeholder="user@email.com"
            style={{
              border: "solid",
              borderRadius: 5,
              borderColor: "black",
              paddingLeft: 10,
              width: "100%",
              height: 35,
            }}
          />
          <p>Password:</p>
          <input
            type="password"
            placeholder="Password"
            style={{
              border: "solid",
              borderRadius: 5,
              borderColor: "black",
              paddingLeft: 10,
              width: "100%",
              height: 35,
            }}
          />
          <p>Phone Number:</p>
          <input
            type="text"
            placeholder="+62xxxxxxx"
            style={{
              border: "solid",
              borderRadius: 5,
              borderColor: "black",
              paddingLeft: 10,
              width: "100%",
              height: 35,
            }}
          />
          <p>Address:</p>
          <input
            type="text"
            placeholder="Address"
            style={{
              border: "solid",
              borderRadius: 5,
              borderColor: "black",
              paddingLeft: 10,
              width: "100%",
              height: 35,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <button
              type="submit"
              style={{
                alignSelf: "center",
                border: "solid",
                borderColor: "white",
                borderRadius: 7,
                width: "20%",
                height: 35,
                backgroundColor: "green",
                color: "white",
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
