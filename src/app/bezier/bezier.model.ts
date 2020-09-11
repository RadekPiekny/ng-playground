export class Line {
    cubicRoots(P: number[])
    {

        let A=P[1] / P[0];
        let B=P[2] / P[0];
        let C=P[3] / P[0];

        const Q = (3*B - Math.pow(A, 2))/9;
        const R = (9*A*B - 27*C - 2*Math.pow(A, 3))/54;
        const D = Math.pow(Q, 3) + Math.pow(R, 2);    // polynomial discriminant

        let t: number[] = [];
        if (D >= 0)                                 // complex or duplicate roots
        {
            const S = Math.sign(R + Math.sqrt(D))*Math.pow(Math.abs(R + Math.sqrt(D)),(1/3));
            const T = Math.sign(R - Math.sqrt(D))*Math.pow(Math.abs(R - Math.sqrt(D)),(1/3));
            t.push(-A/3 + (S + T)); // real root
            t.push(-A/3 - (S + T)/2); // real part of complex root
            t.push(-A/3 - (S + T)/2); // real part of complex root
            const Im = Math.abs(Math.sqrt(3)*(S - T)/2);    // complex part of root pair
            //discard complex roots
            if (Im!=0)
            {
                t[1]=-1;
                t[2]=-1;
            }
        }
        else // distinct real roots
        {
            let th: number = Math.acos(R/Math.sqrt(-Math.pow(Q, 3)));
            t.push(2*Math.sqrt(-Q)*Math.cos(th/3) - A/3);
            t.push(2*Math.sqrt(-Q)*Math.cos((th + 2*Math.PI)/3) - A/3);
            t.push(2*Math.sqrt(-Q)*Math.cos((th + 4*Math.PI)/3) - A/3);
        }
        /*discard out of spec roots*/
        for (var i=0;i<3;i++) {
            if (t[i]<0 || t[i]>1.0) {
                t[i]=-1;
            }
        }
        /*sort but place -1 at the end*/
        t = this.sortSpecial(t);
        return t;
    }

    computeIntersections(p: IPoint[],l: IPoint[]): IPoint[] {
        let result: IPoint[] = [];
        let X: number[] = [];
        let A: number = l[1].y - l[0].y;
        let B: number = l[0].x - l[1].x;
        var C: number = l[0].x * (l[0].y - l[1].y) + l[0].y * (l[1].x - l[0].x);

        var bx = this.bezierCoeffs(p[0].x, p[1].x, p[2].x, p[3].x);
        var by = this.bezierCoeffs(p[0].y, p[1].y, p[2].y, p[3].y);
        var P: number[] = [];
        P.push(A*bx[0]+B*by[0]);		/*t^3*/
        P.push(A*bx[1]+B*by[1]);		/*t^2*/
        P.push(A*bx[2]+B*by[2]);		/*t*/
        P.push(A*bx[3]+B*by[3] + C);	/*1*/

        var r: number[] = this.cubicRoots(P);
        /*verify the roots are in bounds of the linear segment*/
        for (var i=0;i<3;i++)
        {
            let t=r[i];
            X[0]=bx[0]*t*t*t+bx[1]*t*t+bx[2]*t+bx[3];
            X[1]=by[0]*t*t*t+by[1]*t*t+by[2]*t+by[3];
            /*above is intersection point assuming infinitely long line segment,
    make sure we are also in bounds of the line*/
            var s;
            if ((l[1].x - l[0].x)!=0)           /*if not vertical line*/
                s=(X[0] - l[0].x) / (l[1].x - l[0].x);
            else
                s=(X[1] - l[0].y) / (l[1].y - l[0].y);
            if (t<0 || t>1.0 || s<0 || s>1.0)
            {
                X[0] = -100;  /*move off screen*/
                X[1] = -100;
            }
            result.push({x: X[0], y: X[1]})
        }
        return result;
    }

    bezierCoeffs(P0: number,P1: number,P2: number,P3: number) {
        let Z: number[] = [];
        Z.push(-P0 + 3*P1 + -3*P2 + P3);
        Z.push(3*P0 - 6*P1 + 3*P2);
        Z.push(-3*P0 + 3*P1);
        Z.push(P0);
        return Z;
    }

    sortSpecial(a: number[]): number[] {
        let flip: boolean;
        let temp: number;
        do {
            flip=false;
            for (var i=0;i<a.length-1;i++)
            {
                if ((a[i+1]>=0 && a[i]>a[i+1]) ||
                    (a[i]<0 && a[i+1]>=0))
                {
                    flip=true;
                    temp=a[i];
                    a[i]=a[i+1];
                    a[i+1]=temp;
                }
            }
        } while (flip);
        return a;
    }
}

export class Point {
    x: number;
    y: number;
}
export interface IPoint {
    x: number;
    y: number;
}