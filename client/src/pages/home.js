// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { plateVariants, staggerContainer, fadeIn } from "../variants";

import plate from "../images/plate.png";
import title from "../images/title.png";

const Home = () => {
  return (
    <section className='min-h-[620px] ml-8'>
      <div className='container mx-auto min-h-[620px]'>
        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          className='min-h-[620px] flex flex-col flex-start lg:flex-row mt-10 xl:mt-[7%] overflow-hidden'
        >
          <motion.div
            variants={fadeIn("right", "tween", 0.2, 1.8)}
            className='flex-1 ml-[5%] mt-[15%] '
          >
          
            <img
              src={title}
              alt='recipe app'
              className='mb-8 xl:w-[29vw] sm:max-lg:ml-[15vw]'
              height={200}
              width={400}
            />
          
          </motion.div>
          <motion.div
            variants={plateVariants}
            className='-mb-[300px] xl:mr-[10%] -mr-[23%] z-10 invisible lg:visible'
          >
            <img src={plate} alt='plate' className='w-2/3  xl:w-[39vw] ' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
