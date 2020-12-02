package weather.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import weather.dao.SearchWeatherData;
import weather.domain.DateInterval;
import weather.domain.RemainData;
import weather.domain.RespJson;
import weather.domain.WeatherData;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/upgrade")
public class upgradeServ extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("application/json;charset=utf-8");

        DateInterval dateInterval = new DateInterval();
        dateInterval.setYearFrom(req.getParameter("yearFrom"));
        dateInterval.setMonthFrom(req.getParameter("monthFrom"));
        dateInterval.setDayFrom(req.getParameter("dayFrom"));
        dateInterval.setYearTo(req.getParameter("yearTo"));
        dateInterval.setMonthTo(req.getParameter("monthTo"));
        dateInterval.setDayTo(req.getParameter("dayTo"));
        String dataType = req.getParameter("dataType");
        String checked = req.getParameter("checked");
        String cityName = req.getParameter("cityName");
        ObjectMapper obm = new ObjectMapper();
        ArrayList<WeatherData> dataList = SearchWeatherData.getAllData(dateInterval,cityName,dataType,checked);
        if(checked.contains("中值"))
        {
            if(RemainData.checkedDataList == null)
                RemainData.checkedDataList = new ArrayList<>();
            else RemainData.checkedDataList.addAll(dataList);
        }
        if("initial".equals(dataType))
            RemainData.checkedDataList = null;
        RespJson rj = new RespJson();
        rj.setDataList(dataList);
        int rowsCount = SearchWeatherData.getRowsCount(dateInterval,cityName,dataType,checked);
        rj.setRowsCount(rowsCount);
        int pageCount =  rowsCount / 9 + 1;
        rj.setPageCount(pageCount);
        String respJson = obm.writeValueAsString(rj);
        resp.getWriter().write(respJson);
    }
}
