using LiveCharts;
using LiveCharts.Wpf;
using System.Windows.Controls;
using System.Windows.Media;

namespace RentRide
{
    public partial class DashboardPage : Page
    {
        public DashboardPage()
        {
            InitializeComponent();
            LoadCharts();
        }

        private void LoadCharts()
        {
            // Data for Bookings chart
            BookingsChart.Series = new SeriesCollection
            {
                new LineSeries
                {
                    Title = "Bookings",
                    Values = new ChartValues<int> { 12, 15, 18, 20, 22, 25 },
                    Fill = Brushes.Transparent,
                    Stroke = Brushes.DodgerBlue,
                    PointGeometry = DefaultGeometries.Circle,
                    PointGeometrySize = 15,
                    LineSmoothness = 0.5 // Makes the line smoother
                }
            };

            BookingsChart.AxisX.Add(new Axis
            {
                Title = "Months",
                Labels = new[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun" },
            });

            

            // Data for Active Users chart
            ActiveUsersChart.Series = new SeriesCollection
            {
                new ColumnSeries
                {
                    Title = "Active Users",
                    Values = new ChartValues<int> { 300, 450, 600, 500, 700, 900, 1100 },
                    Fill = Brushes.Tomato,
                    DataLabels = true
                }
            };

            ActiveUsersChart.AxisX.Add(new Axis
            {
                Title = "Days",
                Labels = new[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" },
            });

            
        }
    }
}