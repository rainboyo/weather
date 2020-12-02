package weather.domain;

import java.util.ArrayList;

public class RespJson {
    ArrayList<WeatherData> dataList;
    int rowsCount;
    int pageCount;

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getPageCount() {
        return pageCount;
    }

    public RespJson() {
    }

    public ArrayList<WeatherData> getDataList() {
        return dataList;
    }

    public int getRowsCount() {
        return rowsCount;
    }

    public void setDataList(ArrayList<WeatherData> dataList) {
        this.dataList = dataList;
    }

    public void setRowsCount(int rowsCount) {
        this.rowsCount = rowsCount;
    }
}
