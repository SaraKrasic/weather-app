import { useContext, useState, useEffect } from "react";
import { ErrorDialogProps } from "../model/ErrorDialogProps";
import { NameContext } from "../App";

const ErrorNotification = () => {
  const errorCtx = useContext(NameContext);
  const duration = 2000;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (errorCtx.error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [errorCtx.error, duration, errorCtx]);

  const handleCloseErrorDialog = () => {
    setVisible(false);
    errorCtx.setError(null);
  };

  const ErrorDialog: React.FC<ErrorDialogProps> = ({ message }) => {
    return (
      <div className="error-dialog">
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
