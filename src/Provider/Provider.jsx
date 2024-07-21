import AuthProvider from "../context/AuthProvider";
import BookmarksProvider from "../context/BookmarksProvider";
import HotelsProvider from "../context/HotelsProvider";

function Provider({ children }) {
  return (
    <AuthProvider>
      <HotelsProvider>
        <BookmarksProvider>{children}</BookmarksProvider>
      </HotelsProvider>
    </AuthProvider>
  );
}

export default Provider;
