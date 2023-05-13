import { motion } from "framer-motion";
import categoryCover from "../assets/img/categories/categoryDefault.jpg";

const Header = (props, { children }) => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="header"
    >
      <div className="h-[300px] relative overflow-hidden flex items-center">
        <div className="w-full flex justify-center items-center absolute">
          <h1 className="header-heading text-5xl uppercase font-bold text-center text-white">
            {props.name}
          </h1>
        </div>
        {props.imageCat ? (
          <img className="w-full" src={props.imageCat} alt="imageCategory" />
        ) : (
          <img className="w-full" src={categoryCover} alt="imageCategory" />
        )}
      </div>
    </motion.header>
  );
};
export default Header;
