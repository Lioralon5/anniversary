import { motion } from 'framer-motion';
import Gallery from './Gallery';

const AnimatedGallery = ({ photos }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Gallery photos={photos} />
  </motion.div>
);

export default AnimatedGallery;
