import React, { FC } from "react";
import { motion } from "framer-motion";
import classes from "./ImagesContainer.module.scss";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import Lightbox from "yet-another-react-lightbox";

interface ImagesContainerProps {
  images: string[];
  onClose: () => void;
}

const ImagesContainer: FC<ImagesContainerProps> = ({ onClose, images }) => {
  const [index, setIndex] = React.useState(-1);
  return (
    <>
      <Dialog open={true} onClose={onClose} maxWidth="lg">
        {/* <DialogTitle>
          <IconButton>
            <LoyaltyIcon />
          </IconButton>
        </DialogTitle> */}
        <DialogContent>
          <div className={classes.imagesContainer}>
            <div className={classes.images}>
              {images.map((image, index) => (
                <motion.img
                  key={index}
                  className={classes.img}
                  src={image}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIndex(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Lightbox
        index={index}
        slides={images.map((image) => ({ src: image }))}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
};

export default ImagesContainer;
