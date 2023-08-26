package Exception;

/**
 * 自定义异常类
 */
public class CustomException extends Exception {

    static final long serialVersionUID = -3387516993124229948L;

    public CustomException() {
    }

    public CustomException(String message) {
        super(message);
    }

    public CustomException(String message, Throwable cause) {
        super(message, cause);
    }
}
