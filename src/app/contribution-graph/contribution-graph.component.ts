import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-contribution-graph',
  templateUrl: './contribution-graph.component.html',
  styleUrls: ['./contribution-graph.component.scss']
})
export class ContributionGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  private chart: any;
  monthLabels: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    if (!this.chartContainer) {
      return;
    }

    // Use setTimeout to ensure the container is rendered
    setTimeout(() => {
      if (!this.chartContainer?.nativeElement) {
        return;
      }

      this.chart = echarts.init(this.chartContainer.nativeElement, null, {
        width: 'auto',
        height: 110
      });

      // Generate contribution data organized by weeks
      const { data, weeks, monthLabels } = this.generateContributionData();
      this.monthLabels = monthLabels;

      // Debug: Log data to verify it's being generated
      console.log('Contribution data sample:', data.slice(0, 10));
      console.log('Total data points:', data.length);

      const option = {
        tooltip: {
          position: 'top',
          formatter: (params: any) => {
            const date = params.data[3];
            const count = params.data[2];
            if (count === 0) {
              return `No contributions on ${date}`;
            }
            return `${count} contribution${count > 1 ? 's' : ''} on ${date}`;
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'transparent',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          padding: [8, 12]
        },
        grid: {
          height: 110,
          width: 'auto',
          top: 10,
          left: 30,
          right: 10,
          bottom: 30,
          containLabel: false
        },
        xAxis: {
          type: 'category',
          data: weeks.map((_, i) => i.toString()),
          show: false,
          splitArea: {
            show: false
          },
          boundaryGap: true
        },
        yAxis: {
          type: 'category',
          data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          inverse: false,
          splitArea: {
            show: false
          },
          boundaryGap: true,
          axisLabel: {
            fontSize: 12,
            color: '#57606a',
            margin: 8
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        visualMap: {
          min: 0,
          max: 20,
          calculable: false,
          show: false,
          dimension: 2, // Use the third element (value) for color mapping
          inRange: {
            color: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
          },
          outOfRange: {
            color: '#ebedf0'
          }
        },
        series: [{
          name: 'Contributions',
          type: 'heatmap',
          data: data,
          label: {
            show: false
          },
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 2,
            borderRadius: 2
          },
          emphasis: {
            itemStyle: {
              borderColor: '#000000',
              borderWidth: 2,
              shadowBlur: 4,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          animation: false
        }]
      };

      this.chart.setOption(option);

      // Add month labels manually
      this.addMonthLabels(weeks, monthLabels);

      // Handle window resize
      window.addEventListener('resize', () => {
        if (this.chart) {
          this.chart.resize();
        }
      });
    }, 200);
  }

  generateContributionData(): { data: any[], weeks: Date[][], monthLabels: any[] } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Go back 53 weeks (approximately 1 year)
    const weeks: Date[][] = [];
    const monthLabels: { week: number, month: string }[] = [];
    const data: any[] = [];

    // Start from today and go back week by week
    let currentDate = new Date(today);

    // Find the start of the current week (Sunday)
    const dayOfWeek = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - dayOfWeek);

    // Generate 53 weeks of data (going backwards from today)
    const allWeeks: Date[][] = [];
    const tempData: any[] = [];

    for (let week = 0; week < 53; week++) {
      const weekDates: Date[] = [];

      // For each week, get all 7 days
      for (let day = 0; day < 7; day++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + day);
        weekDates.push(new Date(date));

        // Only add data if date is not in the future
        if (date <= today) {
          const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          // Generate random contribution count (0-20)
          // In a real app, this would come from the API
          // Using a distribution that ensures some days have contributions
          const rand = Math.random();
          let contributions = 0;
          if (rand > 0.7) {
            contributions = Math.floor(Math.random() * 5) + 1; // 1-5 contributions
          } else if (rand > 0.4) {
            contributions = Math.floor(Math.random() * 10) + 6; // 6-15 contributions
          } else if (rand > 0.2) {
            contributions = Math.floor(Math.random() * 5) + 16; // 16-20 contributions
          }
          // else contributions = 0

          // Store with original week index (will be remapped after reverse)
          tempData.push({ week, day, contributions, dateStr });
        }
      }

      allWeeks.push(weekDates);

      // Move to previous week
      currentDate.setDate(currentDate.getDate() - 7);
    }

    // Reverse to show oldest week first (left to right)
    allWeeks.reverse();

    // Remap data with new week indices after reversal
    tempData.forEach(item => {
      const newWeekIndex = 52 - item.week; // Reverse the week index
      data.push([newWeekIndex, item.day, item.contributions, item.dateStr]);
    });

    // Generate month labels for display
    const monthMap = new Map<number, string>();
    allWeeks.forEach((weekDates, weekIndex) => {
      const firstDay = weekDates[0];
      const month = firstDay.getMonth();
      if (!monthMap.has(month) || weekDates[0].getDate() <= 7) {
        const monthName = firstDay.toLocaleDateString('en-US', { month: 'short' });
        monthMap.set(month, monthName);
      }
    });

    // Create month labels array (one per month, positioned approximately)
    const monthLabelsArray: string[] = [];
    let lastMonth = -1;
    allWeeks.forEach((weekDates) => {
      const month = weekDates[0].getMonth();
      if (month !== lastMonth) {
        monthLabelsArray.push(weekDates[0].toLocaleDateString('en-US', { month: 'short' }));
        lastMonth = month;
      }
    });

    return { data, weeks: allWeeks, monthLabels: monthLabelsArray };
  }

  addMonthLabels(weeks: Date[][], monthLabels: any[]): void {
    // This will be handled by CSS positioning
    // Store month labels in component for template access if needed
  }

  getMonths(): string[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const result: string[] = [];

    // Get last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      result.push(months[date.getMonth()]);
    }

    return result;
  }
}
