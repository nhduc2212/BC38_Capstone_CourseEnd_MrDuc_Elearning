import React, { useEffect, useState } from "react";
import { scrollToTop } from "../Utils/ultiScript";
import '../styles/STTButton.scss'

const STTButton = () => {
  const [offset, setOffset] = useState(0);

  return (
    <button
      id="scrollToTopBtn"
      onClick={scrollToTop}
      className="scrollToTopBtn"
    >
      <i class="fa-solid fa-angles-up"></i>
    </button>
  );
};

export default STTButton;
