package ValueTransfer;

import This.ThisDemo;

/**
 * 演示Java值传递机制的一个demo
 */
public class demo {
    public static void main(String[] args) {
        String str = "str";
        int[] arg = new int[]{1,2,3};
        demo demo = new demo();
        demo.exchange(str,arg); //这是实参是str 和 arg
        System.out.println("str = "+str);//str = str
        System.out.println("arg = "+arg[0]); // arg = [3,2,3]
        int x = 5,y = 8;
        demo.exchange(x,y);
        System.out.println("x = "+x+" y = "+y); // x = 5  y = 8
    }

    //形参是str 和 arg,他们是是实参的副本，而他们被赋予实参的值后如果更改的话原形参的值不会收到影响
    public void exchange(String str,int[] arg){
        str = "ok";
        arg[0] = 3;
    }
    public void exchange(int a,int b){
        int tmp = b;
        b = a;
        a = tmp;
    }
}
