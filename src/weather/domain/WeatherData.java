package weather.domain;

public class WeatherData {
    private String date;
    private String t;
    private String po;
    private String u;
    private String vv;
    private String td;
    private int lable;



    public WeatherData(){

    }
    public void setDate(String date) {
        this.date = date;
    }

    public void setT(String t) {
        this.t = t;
    }

    public void setPo(String po) {
        this.po = po;
    }

    public void setU(String u) {
        this.u = u;
    }

    public void setVv(String vv) {
        this.vv = vv;
    }

    public void setTd(String td) {
        this.td = td;
    }

    public String getDate() {
        return date;
    }

    public String getT() {
        return t;
    }

    public String getPo() {
        return po;
    }

    public String getU() {
        return u;
    }

    public String getVv() {
        return vv;
    }

    public String getTd() {
        return td;
    }

    public void setLable(int lable) {
        this.lable = lable;
    }

    public int getLable() {
        return lable;
    }

    @Override
    public String toString() {
        return "WeatherData{" +
                "date='" + date + '\'' +
                ", t='" + t + '\'' +
                ", po='" + po + '\'' +
                ", u='" + u + '\'' +
                ", vv='" + vv + '\'' +
                ", td='" + td + '\'' +
                ", lable=" + lable +
                '}';
    }
}
