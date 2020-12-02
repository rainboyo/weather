package weather.domain;

import weather.utils.MyStringUtils;

public class DateInterval {
    private String yearFrom;
    private String monthFrom;
    private String dayFrom;
    private String yearTo;
    private String monthTo;
    private String dayTo;

    public DateInterval() {
    }

    public String getYearFrom() {
        return yearFrom;
    }

    public String getMonthFrom() {
        return monthFrom;
    }

    public String getDayFrom() {
        return dayFrom;
    }

    public String getYearTo() {
        return yearTo;
    }

    public String getMonthTo() {
        return monthTo;
    }

    public String getDayTo() {
        return dayTo;
    }

    public void setYearFrom(String yearFrom) {
        this.yearFrom = yearFrom;
    }

    public void setMonthFrom(String monthFrom) {
        if("月".equals(monthFrom) == false)
            monthFrom = MyStringUtils.getDoubleDigitDate(monthFrom);
        this.monthFrom = monthFrom;
    }

    public void setDayFrom(String dayFrom) {
        if("日".equals(dayFrom) == false)
            dayFrom = MyStringUtils.getDoubleDigitDate(dayFrom);
        this.dayFrom = dayFrom;
    }

    public void setYearTo(String yearTo) {
        this.yearTo = yearTo;
    }

    public void setMonthTo(String monthTo) {
        if("月".equals(monthTo) == false)
            monthTo = MyStringUtils.getDoubleDigitDate(monthTo);
        else monthTo = "01";
        this.monthTo = monthTo;
    }

    public void setDayTo(String dayTo) {
        if("日".equals(dayTo) == false)
            dayTo = MyStringUtils.getDoubleDigitDate(dayTo);
        else dayTo = "01";
        this.dayTo = dayTo;
    }

    @Override
    public String toString() {
        return "DateInterval{" +
                "yearFrom='" + yearFrom + '\'' +
                ", monthFrom='" + monthFrom + '\'' +
                ", dayFrom='" + dayFrom + '\'' +
                ", yearTo='" + yearTo + '\'' +
                ", monthTo='" + monthTo + '\'' +
                ", dayTo='" + dayTo + '\'' +
                '}';
    }
}
