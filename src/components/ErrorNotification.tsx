import { useContext, useState, useEffect } from "react";
import { ErrorDialogProps } from "../model/ErrorDialogProps";
import { NameContext } from "../App";

const ErrorNotification = () => {
  const errorCtx = useContext(NameContext);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (errorCtx.error) {
      setVisible(true);
    }
  }, [errorCtx]);

  const handleCloseErrorDialog = () => {
    setVisible(false);
    errorCtx.setError(null);
  };

  const ErrorDialog: React.FC<ErrorDialogProps> = ({ message }) => {
    return (
      <div className="error-dialog">
        <button className="close" onClick={handleCloseErrorDialog}>
          x
        </button>
        <div className="error-content">
          <p>{message}</p>
        </div>
      </div>
    );
  };

  return visible ? (
    <div className="errorDialog">
      {errorCtx.error && (
        <ErrorDialog
          message={errorCtx.error}
          onClose={handleCloseErrorDialog}
        />
      )}
    </div>
  ) : null;
};

export default ErrorNotification;
