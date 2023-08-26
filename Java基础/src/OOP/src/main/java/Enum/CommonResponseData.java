package Enum;


/**
 * 在实际应用中，可以使用枚举类来实现枚举业务状态对象，业务状态包括状态码，状态信息；将这些封装起来并用相应的对象名进行命名
 * 然后在需要返回这些业务对象时直接调用即可，这样做既可提高代码的可读性，也可提高扩展性和可维护性
 */

/**
 * 定义一个通用的返回信息类
 * @param <T>
 */
public class CommonResponseData<T>{
    private int code;//返回码
    private String msg;//响应信息
    private T data;//返回内容

    public CommonResponseData(T data) {
        this.data = data;
    }

    public CommonResponseData(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public static CommonResponseData OKResult(Object data){
        CommonResponseData commonData = new CommonResponseData<>(data);
        commonData.code = HttpCode.SUCCESS.getCode();
        commonData.msg = HttpCode.SUCCESS.getMsg();
        return commonData;
    }

    public static CommonResponseData errorResult(HttpCode httpCode){
        CommonResponseData commonData = new CommonResponseData(httpCode.getCode(),httpCode.getMsg());
        return commonData;
    }

}
enum HttpCode {
    SUCCESS(200,"操作成功"),
    NEED_LOGIN(401,"需要登陆后才能访问"),
    SYSTEM_ERROR(500,"系统错误");
    private int code;
    private String msg;

    HttpCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
