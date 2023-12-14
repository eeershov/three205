const hostname = window.location.hostname;

let backendUrl: string;

if (hostname === "localhost") {
  backendUrl = "http://localhost:9090/api/users";
} else {
  backendUrl = "https://test.kioskcomedy.org/api/users";
}

export { backendUrl };
