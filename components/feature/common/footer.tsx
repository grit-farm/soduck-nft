"use client";

function Footer() {
  return (
    <>
      <section className="bg-yellow-50 text-xs"></section>
      <footer>
        <div className="mx-auto w-full max-w-screen-xl py-4">
          <span className="block text-center text-xs"></span>
        </div>
        <span className="block text-center text-sm">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Soduck
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex justify-center gap-8 py-4"></div>
      </footer>
    </>
  );
}

export default Footer;
