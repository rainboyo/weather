package weather.algorithm;

import weather.domain.RemainData;
import weather.domain.WeatherData;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class SimpleSVM
{
    private int exampleNum;//X数组行数
    private int exampleDim;//X数组列数
    private double[] w;//权值
    private double lambda;//损失函数的参数
    private double lr = 0.001;//0.00001 学习率
    private double threshold = 0.001; //迭代停止 权值变换小于threshold
    private double cost;//HingeLoss损失函数  cost = HingeLoss^2 + lambda*||w||^2   cost = err'*err + lambda*w'*w; grad = 2*X(idx,:)'*err + 2*lambda*w;

    private double[] grad;//存放需要更新的权值w
    private double[] yp;//存放每一行x和权值w的点积 yp【0】表示第一行x和w的点积
    public SimpleSVM(double paramLambda)
    {

        lambda = paramLambda;

    }

    private void CostAndGrad(double[][] X,double[] y)
    {
        cost =0;
        for(int m=0;m<exampleNum;m++)//从第一行开始进行循环
        {
            yp[m]=0;
            for(int d=0;d<exampleDim;d++)
            {
                yp[m]+=X[m][d]*w[d];//第一行x和权值w的点积
            }

            if(y[m]*yp[m]-1<0)
            {
                cost += (1-y[m]*yp[m]);//将y label（-1 or 1）和点积相乘 和1的差 相加
            }

        }

        for(int d=0;d<exampleDim;d++)
        {
            cost += 0.5*lambda*w[d]*w[d];
        }


        for(int d=0;d<exampleDim;d++)
        {
            grad[d] = Math.abs(lambda*w[d]);
            for(int m=0;m<exampleNum;m++)
            {
                if(y[m]*yp[m]-1<0)
                {
                    grad[d]-= y[m]*X[m][d];
                }
            }
        }
    }

    private void update()
    {
        for(int d=0;d<exampleDim;d++)
        {
            w[d] -= lr*grad[d];
        }
    }

    public void Train(double[][] X,double[] y,int maxIters)
    {
        exampleNum = X.length;
        if(exampleNum <=0)
        {
            System.out.println("num of example <=0!");
            return;
        }
        exampleDim = X[0].length;
        w = new double[exampleDim];
        grad = new double[exampleDim];
        yp = new double[exampleNum];

        for(int iter=0;iter<maxIters;iter++)
        {

            CostAndGrad(X,y);
            System.out.println("cost:"+cost);
            if(cost< threshold)
            {
                break;
            }
            update();

        }
    }
    private int predict(double[] x)
    {
        double pre=0;
        for(int j=0;j<x.length;j++)
        {
            pre+=x[j]*w[j];
        }
        if(pre >=0)//这个阈值一般位于-1到1
            return 1;
        else return -1;
    }

    public void Test(double[][] testX,double[] testY)
    {
        int error=0;
        for(int i=0;i<testX.length;i++)
        {
            if(predict(testX[i]) != testY[i])
            {
                error++;
            }
        }
        System.out.println("total:"+testX.length);
        System.out.println("error:"+error);
        System.out.println("error rate:"+((double)error/testX.length));
        System.out.println("acc rate:"+((double)(testX.length-error)/testX.length));
    }



    public static void loadData(double[][]X,double[] y,String trainFile) throws IOException
    {

        File file = new File(trainFile);
        RandomAccessFile raf = new RandomAccessFile(file,"r");
        StringTokenizer tokenizer,tokenizer2;

        int index=0;
        while(true)
        {
            String line = raf.readLine();

            if(line == null) break;
            tokenizer = new StringTokenizer(line," ");
            y[index] = Double.parseDouble(tokenizer.nextToken());
            //System.out.println(y[index]);
            while(tokenizer.hasMoreTokens())
            {
                tokenizer2 = new StringTokenizer(tokenizer.nextToken(),":");
                int k = Integer.parseInt(tokenizer2.nextToken());
                double v = Double.parseDouble(tokenizer2.nextToken());
                X[index][k] = v;
                //System.out.println(k);
                //System.out.println(v);
            }
            X[index][0] =1;
            index++;
        }
    }

    public static void loadData(double[][]X,double[] y) throws IOException
    {

    }



    public static void main(String[] args) throws IOException
    {

        double[] y = new double[400];
        double[][] X = new double[400][11];
        WeatherData[] trainData = (WeatherData[])RemainData.checkedDataList.toArray();
        loadData(X,y);
        SimpleSVM svm = new SimpleSVM(0.0001);
        svm.Train(X,y,7000);

        double[] test_y = new double[283];
        double[][] test_X = new double[283][11];
        loadData(test_X,test_y);
        svm.Test(test_X, test_y);

    }

}

