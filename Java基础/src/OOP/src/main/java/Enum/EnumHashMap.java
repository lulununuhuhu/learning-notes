package Enum;

/**
 * 使用enum枚举类可以实现类似hashMap的映射关系
 */
public class EnumHashMap {
    public static void main(String[] args) {
        System.out.println("1对应的性别是:"+sexEnum.getByCode(1));
        System.out.println("0对应的性别是:"+sexEnum.getByCode(0));
    }

}

/**
 * 定义性别的枚举类
 */
enum sexEnum{
    /**
     * 形成 1 --> 男    0--->女的映射关系
     */
    MALE(1,"男"),
    FEMALE(0,"女");

    private final int sex;
    private final String sexName;

    sexEnum(int sex, String sexName) {
        this.sex = sex;
        this.sexName = sexName;
    }

    public int getSex() {
        return sex;
    }

    public String getSexName() {
        return sexName;
    }

    /**
     * 根据code获取得到性别名
     * @param code sexId
     * @return
     */
    public static String getByCode(Integer code){
        for (sexEnum value : sexEnum.values()) {
            if(value.getSex() == code)
                return value.getSexName();
        }
        return "";
    }
}
