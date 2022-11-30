import { Divider, Grid, makeStyles, Typography, useMediaQuery, useTheme, LinearProgress, Box, Slide } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import React from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./../../utils/firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  dropzone: {
    textAlign: "center",
    padding: "30px",
    border: "3px dashed #eeeeee",
    backgroundColor: "#fafafa",
    color: "#6e6e6e",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "15px"
  },
  progress: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}));

export default function FirebaseUpload(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  const [modalStyle] = React.useState(getModalStyle);

  const [selectedFiles, setSelectedFile] = React.useState([]);
  const [progresspercent, setProgresspercent] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);

  const { open: openDialog, onSuccess, onClose } = props;

  function onDrop(files) {
    setSelectedFile(files);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop
  });

  async function uploadToStorage(event) {
    setIsUploading(true);
    event.preventDefault();
    const storageRef = ref(storage, `Image/${selectedFiles[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFiles[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert("Tải lên thất bại");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setSelectedFile([]);
          setProgresspercent(0);
          onSuccess(downloadURL);
          setIsUploading(false);
          onClose();
        });
      }
    );
  }

  return (
    <Modal open={openDialog || false} onClose={onClose} TransitionComponent={Transition} keepMounted>
      <div style={{ ...modalStyle, width: matchDownXs ? "100%" : "500px" }} className={classes.paper}>
        <Typography variant="h6">Upload Image</Typography>
        <Divider className={classes.divider} />
        {!isUploading && (
          <Dropzone multiple={false}>
            {() => (
              <section>
                <div {...getRootProps({ className: classes.dropzone })}>
                  <input {...getInputProps()} />
                  {selectedFiles.length && selectedFiles[0].name ? (
                    <div className="selected-file">{selectedFiles.length && selectedFiles[0].name}</div>
                  ) : (
                    "Drag 'n' drop some files here, or click to select files"
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        )}
        {isUploading && (
          <Box>
            <Box>
              <Typography variant="h6">Uploading...</Typography>
            </Box>
            <Box display="flex" alignItems="center" className={classes.progress}>
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={progresspercent} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${progresspercent}%`}</Typography>
              </Box>
            </Box>
          </Box>
        )}
        <Grid container justifyContent="flex-end" spacing={3}>
          <Grid item>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={!selectedFiles[0]?.name || isUploading} variant="contained" color="primary" onClick={uploadToStorage}>
              Upload
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}
