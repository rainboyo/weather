package weather.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import weather.dao.SearchWeatherData;
import weather.domain.DateInterval;
import weather.domain.RespJson;
import weather.domain.WeatherData;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/initialData")
public class InitialDataServ extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
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
        int pagenum = Integer.parseInt(req.getParameter("pagenum"));
        String dataType = req.getParameter("dataType");
        String checked = req.getParameter("checked");
        String cityName = req.getParameter("cityName");
        ObjectMapper obm = new ObjectMapper();
        ArrayList<WeatherData> dataList = SearchWeatherData.getData(dateInterval,pagenum, cityName,dataType,checked);
        RespJson rj = new RespJson();
        rj.setDataList(dataList);
        int rowsCount = SearchWeatherData.getRowsCount(dateInterval,cityName,dataType,checked);
        rj.setRowsCount(rowsCount);
        int pageCount =  rowsCount / 9 + 1;
        rj.setPageCount(pageCount);
        String respJson = obm.writeValueAsString(rj);
        resp.getWriter().write(respJson);
        System.out.println(respJson);


    }
}
