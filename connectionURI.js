var connectionuri;
if (location.hostname === "localhost") {
    connectionuri = "http://localhost:8033";
} else if (location.hostname === "127.0.0.1") {
    connectionuri = "http://localhost:8033";
} else {
    connectionuri = "https://codemaxxerlink.stu.nighthawkcodingsociety.com";
}