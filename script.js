// Utility functions
const formatCurrency = (value) => `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
const formatNumber = (value) => new Intl.NumberFormat('id-ID').format(value);

// Mock Data Generation
function generateTimeSeriesData(numPoints, period) {
    const data = [];
    let currentDate = new Date('2025-10-01T00:00:00Z');
    for (let i = 0; i < numPoints; i++) {
        data.push({
            date: new Date(currentDate),
            joumpa_rev: Math.random() * 50000000 + 150000000,
            joumpa_prod: Math.floor(Math.random() * 200 + 500),
            glc_rev: Math.random() * 20000000 + 50000000,
            glc_prod: Math.floor(Math.random() * 10 + 20),
            gpl_rev: Math.random() * 100000000 + 300000000,
            gpl_prod: Math.floor(Math.random() * 50 + 150),
            lounge_rev: Math.random() * 30000000 + 70000000,
            lounge_prod: Math.floor(Math.random() * 300 + 800),
            garbarata_rev: Math.random() * 40000000 + 90000000,
            garbarata_prod: Math.floor(Math.random() * 400 + 1000),
        });
        if (period === 'monthly') currentDate.setMonth(currentDate.getMonth() - 1);
        if (period === 'weekly') currentDate.setDate(currentDate.getDate() - 7);
        if (period === 'daily') currentDate.setDate(currentDate.getDate() - 1);
    }
    return data.reverse();
}

// Initial data load
let timeSeriesData = generateTimeSeriesData(12, 'monthly');

// Chart instances
let joumpaTrendChart, glcTrendChart, glcProductChart, gplTrendChart, gplServiceChart, loungeTrendChart, garbarataTrendChart, loungeSourceChart, stationDiffBarChart;

// Chart Creation Functions
function createJoumpaTrendChart() {
    const ctx = document.getElementById('joumpaTrendChart').getContext('2d');
    const labels = timeSeriesData.map(d => d.date);
    joumpaTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue (Rp)',
                data: timeSeriesData.map(d => d.joumpa_rev),
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                yAxisID: 'y',
                fill: true,
                tension: 0.4
            }, {
                label: 'Produksi (Pax)',
                data: timeSeriesData.map(d => d.joumpa_prod),
                borderColor: '#10B981',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: chartOptions('x', { position: 'left', title: { display: false }}, { position: 'right', title: { display: false }, grid: { drawOnChartArea: false }})
    });
}

function createGlcTrendChart() {
    const ctx = document.getElementById('glcTrendChart').getContext('2d');
    glcTrendChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timeSeriesData.map(d => d.date),
            datasets: [
                {
                    label: 'Revenue (Rp)',
                    data: timeSeriesData.map(d => d.glc_rev),
                    backgroundColor: '#8B5CF6',
                    yAxisID: 'y',
                },
                {
                    label: 'Siswa',
                    data: timeSeriesData.map(d => d.glc_prod),
                    type: 'line',
                    borderColor: '#F59E0B',
                    yAxisID: 'y1',
                    tension: 0.4,
                }
            ]
        },
        options: chartOptions('x', { position: 'left', title: { display: false } }, { position: 'right', title: { display: false }, grid: { drawOnChartArea: false } })
    });
}

function createGlcProductChart() {
    const ctx = document.getElementById('glcProductChart').getContext('2d');
    glcProductChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ground Staff', 'Basic Avsec', 'Garbarata', 'GSE Operator', 'Lainnya'],
            datasets: [{
                label: 'Revenue per Produk',
                data: [120, 80, 50, 45, 30],
                backgroundColor: ['#1D4ED8', '#16A34A', '#F59E0B', '#DC2626', '#6B7280'],
                hoverOffset: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 }, padding:10 } } } }
    });
}

function createGplTrendChart() {
    const ctx = document.getElementById('gplTrendChart').getContext('2d');
    gplTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeSeriesData.map(d => d.date),
            datasets: [{
                label: 'Revenue (Rp)',
                data: timeSeriesData.map(d => d.gpl_rev),
                borderColor: '#059669',
                yAxisID: 'y',
                tension: 0.4
            }, {
                label: 'Produksi (Ton)',
                data: timeSeriesData.map(d => d.gpl_prod),
                borderColor: '#D97706',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: chartOptions('x', { position: 'left', title: { display: false } }, { position: 'right', title: { display: false }, grid: { drawOnChartArea: false } })
    });
}

function createGplServiceChart() {
    const ctx = document.getElementById('gplServiceChart').getContext('2d');
    gplServiceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['AWB Agency', 'Door-to-Door', 'Trucking', 'Customs'],
            datasets: [{
                label: 'Kontribusi Revenue',
                data: [45, 25, 20, 10],
                backgroundColor: ['#1D4ED8', '#16A34A', '#F59E0B', '#DC2626'],
                hoverOffset: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 }, padding:10 } } } }
    });
}

function createLoungeChart() {
    const loungeCtx = document.getElementById('loungeTrendChart').getContext('2d');
    loungeTrendChart = new Chart(loungeCtx, {
        type: 'line',
        data: {
            labels: timeSeriesData.map(d => d.date),
            datasets: [{
                label: 'Revenue Lounge (Rp)',
                data: timeSeriesData.map(d => d.lounge_rev),
                borderColor: '#DB2777',
                backgroundColor: 'rgba(219, 39, 119, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: chartOptions('x', { position: 'left', title: { display: false } })
    });
}

function createLoungeSourceChart() {
    const ctx = document.getElementById('loungeSourceChart').getContext('2d');
    loungeSourceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Walk-in', 'Bank', 'Maskapai'],
            datasets: [{
                label: 'Sumber Revenue',
                data: [30, 55, 15],
                backgroundColor: ['#6366F1', '#EC4899', '#F97316'],
                hoverOffset: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 }, padding:10 } } } }
    });
}

function createGarbarataChart() {
    const garbarataCtx = document.getElementById('garbarataTrendChart').getContext('2d');
    garbarataTrendChart = new Chart(garbarataCtx, {
        type: 'line',
        data: {
            labels: timeSeriesData.map(d => d.date),
            datasets: [{
                label: 'Revenue Garbarata (Rp)',
                data: timeSeriesData.map(d => d.garbarata_rev),
                borderColor: '#7C3AED',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: chartOptions('x', { position: 'left', title: { display: false } })
    });
}

function createStationDiffBarChart() {
    const ctx = document.getElementById('stationDiffBarChart').getContext('2d');
    const stationData = [
        { name: 'CGK', rkap: 500000000, actual_ytd: 525000000 },
        { name: 'DPS', rkap: 350000000, actual_ytd: 330000000 },
        { name: 'SUB', rkap: 280000000, actual_ytd: 290000000 },
        { name: 'UPG', rkap: 250000000, actual_ytd: 230000000 },
        { name: 'KNO', rkap: 220000000, actual_ytd: 225000000 },
    ];

    stationData.forEach(item => item.diff = item.actual_ytd - item.rkap);
    stationData.sort((a, b) => b.diff - a.diff);

    const backgroundColors = stationData.map(item => item.diff >= 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(220, 38, 38, 0.6)');
    const borderColors = stationData.map(item => item.diff >= 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(220, 38, 38, 1)');

    stationDiffBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stationData.map(item => item.name),
            datasets: [{
                label: 'Selisih vs RKAP (Rp)',
                data: stationData.map(item => item.diff),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: function(context) { return ` Selisih: ${formatCurrency(context.raw)}`; } } }
            },
            scales: {
                x: {
                    title: { display: false },
                    ticks: { callback: function(value) { return (value / 1000000) + ' Jt'; }, font: { size: 9 } }
                },
                y: {
                    title: { display: false },
                    ticks: { font: { size: 9 } }
                }
            }
        }
    });
}

function commonChartOptions() {
    return {
        responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false, },
        plugins: { legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 10 }, padding: 15 } } },
        scales: { x: { ticks: { font: { size: 9 } } }, y: { ticks: { font: { size: 9 } } }, y1: { ticks: { font: { size: 9 } } } }
    };
}

function chartOptions(xAxisID, yAxisConfig, y1AxisConfig = null) {
    const options = commonChartOptions();
    options.scales = {
        [xAxisID]: {
            type: 'time',
            time: {
                unit: document.getElementById('period').value === 'daily' ? 'day' : (document.getElementById('period').value === 'weekly' ? 'week' : 'month'),
                tooltipFormat: 'dd MMM yyyy',
                displayFormats: { month: 'MMM yy', week: 'dd MMM', day: 'dd MMM' }
            },
            title: { display: false, },
             ticks: { font: { size: 9 } }
        },
        y: { ...yAxisConfig, beginAtZero: true, ticks: { font: { size: 9 }, callback: function(value){ if(value >= 1000000) return `Rp ${value/1000000} Jt`; return `Rp ${value/1000} Rb`} } }
    };
    if (y1AxisConfig) {
        options.scales.y1 = { ...y1AxisConfig, beginAtZero: true, ticks: { font: { size: 9 } } };
    }
    return options;
}

// Dashboard Update Functions
function updateKPICards() {
    const latestData = timeSeriesData[timeSeriesData.length - 1];
    const prevData = timeSeriesData[timeSeriesData.length - 2] || {};

    const totalRevenue = latestData.joumpa_rev + latestData.glc_rev + latestData.gpl_rev + latestData.lounge_rev + latestData.garbarata_rev;
    const totalProduction = latestData.joumpa_prod + latestData.glc_prod + latestData.gpl_prod + latestData.lounge_prod + latestData.garbarata_prod;
    
    const prevTotalRevenue = (prevData.joumpa_rev || 0) + (prevData.glc_rev || 0) + (prevData.gpl_rev || 0) + (prevData.lounge_rev || 0) + (prevData.garbarata_rev || 0);

    document.getElementById('total-revenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('total-production').textContent = formatNumber(totalProduction);
    document.getElementById('avg-revenue').textContent = formatCurrency(totalProduction > 0 ? totalRevenue / totalProduction : 0);

    updateTrend('total-revenue-trend', totalRevenue, prevTotalRevenue);
    
    const rkapTotal = 200000000 + 70000000 + 400000000 + 90000000 + 110000000;
    const targetPercentage = (totalRevenue / rkapTotal * 100).toFixed(1);
    document.getElementById('target-progress').style.width = `${Math.min(targetPercentage, 100)}%`;
    document.getElementById('target-percentage').textContent = `${targetPercentage}%`;

    // Per Lini Bisnis
    document.getElementById('joumpa-revenue').textContent = formatCurrency(latestData.joumpa_rev);
    document.getElementById('joumpa-production').textContent = `${formatNumber(latestData.joumpa_prod)} Pax`;
    document.getElementById('glc-revenue').textContent = formatCurrency(latestData.glc_rev);
    document.getElementById('glc-production').textContent = `${formatNumber(latestData.glc_prod)} Siswa`;
    document.getElementById('gpl-revenue').textContent = formatCurrency(latestData.gpl_rev);
    document.getElementById('gpl-production').textContent = `${formatNumber(latestData.gpl_prod)} Ton`;
    document.getElementById('lounge-revenue').textContent = formatCurrency(latestData.lounge_rev);
    document.getElementById('lounge-production').textContent = `${formatNumber(latestData.lounge_prod)} Pengunjung`;
    document.getElementById('garbarata-revenue').textContent = formatCurrency(latestData.garbarata_rev);
    document.getElementById('garbarata-production').textContent = `${formatNumber(latestData.garbarata_prod)} Penggunaan`;
}

function updateTrend(elementId, currentValue, previousValue) {
    const trendElement = document.getElementById(elementId);
    if (!previousValue || previousValue === 0) {
        trendElement.textContent = '- vs periode lalu';
        return;
    }
    const percentageChange = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
    if (percentageChange >= 0) {
        trendElement.textContent = `▲ ${percentageChange}%`;
        trendElement.classList.remove('text-red-600');
        trendElement.classList.add('text-green-600');
    } else {
        trendElement.textContent = `▼ ${Math.abs(percentageChange)}%`;
        trendElement.classList.remove('text-green-600');
        trendElement.classList.add('text-red-600');
    }
}

function updateTargetTable() {
    const body = document.getElementById('target-table-body');
    body.innerHTML = '';
    const currentData = timeSeriesData[timeSeriesData.length - 1];
    const data = [
        { name: 'Joumpa', rkap: 200000000, actual_ytd: currentData.joumpa_rev, actual_y1: 185000000 },
        { name: 'GLC', rkap: 70000000, actual_ytd: currentData.glc_rev, actual_y1: 65000000 },
        { name: 'GPL', rkap: 400000000, actual_ytd: currentData.gpl_rev, actual_y1: 380000000 },
        { name: 'Lounge', rkap: 90000000, actual_ytd: currentData.lounge_rev, actual_y1: 92000000 },
        { name: 'Garbarata', rkap: 110000000, actual_ytd: currentData.garbarata_rev, actual_y1: 100000000 },
    ];

    data.forEach(item => {
        const diff = item.actual_ytd - item.rkap;
        const ach = (item.actual_ytd / item.rkap * 100).toFixed(1);
        const yoy = item.actual_y1 === 0 ? 0 : ((item.actual_ytd - item.actual_y1) / item.actual_y1 * 100).toFixed(1);

        let achColorClass = 'bg-red-100 text-red-800';
        if (ach >= 100) achColorClass = 'bg-green-100 text-green-800';
        else if (ach >= 85) achColorClass = 'bg-yellow-100 text-yellow-800';

        const diffColorClass = diff >= 0 ? 'text-green-600' : 'text-red-600';
        const yoyColorClass = yoy >= 0 ? 'text-green-600' : 'text-red-600';
        const yoyIcon = yoy >= 0 ? '▲' : '▼';


        const row = `
            <tr>
                <td class="px-2 py-1.5 whitespace-nowrap font-medium text-gray-900">${item.name}</td>
                <td class="px-2 py-1.5 whitespace-nowrap text-gray-500">${formatCurrency(item.rkap)}</td>
                <td class="px-2 py-1.5 whitespace-nowrap text-gray-500 font-semibold">${formatCurrency(item.actual_ytd)}</td>
                <td class="px-2 py-1.5 whitespace-nowrap ${diffColorClass}">${formatCurrency(diff)}</td>
                <td class="px-2 py-1.5 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${achColorClass}">
                        ${ach}%
                    </span>
                </td>
                <td class="px-2 py-1.5 whitespace-nowrap ${yoyColorClass}">${yoyIcon} ${Math.abs(yoy)}%</td>
            </tr>
        `;
        body.innerHTML += row;
    });
}

function updateStationTargetTable() {
    const body = document.getElementById('station-target-table-body');
    body.innerHTML = '';
    const stationData = [
        { name: 'CGK - Soekarno-Hatta', rkap: 500000000, actual_ytd: 525000000, actual_y1: 480000000 },
        { name: 'DPS - Ngurah Rai', rkap: 350000000, actual_ytd: 330000000, actual_y1: 360000000 },
        { name: 'SUB - Juanda', rkap: 280000000, actual_ytd: 290000000, actual_y1: 270000000 },
        { name: 'UPG - Sultan Hasanuddin', rkap: 250000000, actual_ytd: 230000000, actual_y1: 240000000 },
        { name: 'KNO - Kualanamu', rkap: 220000000, actual_ytd: 225000000, actual_y1: 200000000 },
    ];

    stationData.forEach(item => {
        const ach = (item.actual_ytd / item.rkap * 100).toFixed(1);
        
        let achColorClass = 'bg-red-100 text-red-800';
        if (ach >= 100) achColorClass = 'bg-green-100 text-green-800';
        else if (ach >= 90) achColorClass = 'bg-yellow-100 text-yellow-800';

        const row = `
            <tr>
                <td class="px-2 py-1.5 whitespace-nowrap font-medium text-gray-900">${item.name}</td>
                <td class="px-2 py-1.5 whitespace-nowrap text-gray-500 font-semibold">${formatCurrency(item.actual_ytd)}</td>
                <td class="px-2 py-1.5 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${achColorClass}">
                        ${ach}%
                    </span>
                </td>
            </tr>
        `;
        body.innerHTML += row;
    });
}


function destroyCharts() {
    if (joumpaTrendChart) joumpaTrendChart.destroy();
    if (glcTrendChart) glcTrendChart.destroy();
    if (glcProductChart) glcProductChart.destroy();
    if (gplTrendChart) gplTrendChart.destroy();
    if (gplServiceChart) gplServiceChart.destroy();
    if (loungeTrendChart) loungeTrendChart.destroy();
    if (garbarataTrendChart) garbarataTrendChart.destroy();
    if (loungeSourceChart) loungeSourceChart.destroy();
    if (stationDiffBarChart) stationDiffBarChart.destroy();
}

function updateDashboard(startDate = null, endDate = null) {
    destroyCharts();
    
    const period = document.getElementById('period').value;
    const numPoints = period === 'monthly' ? 12 : (period === 'weekly' ? 12 : 30);
    // In a real app, you would use startDate and endDate to fetch new data
    timeSeriesData = generateTimeSeriesData(numPoints, period);

    updateKPICards();
    createJoumpaTrendChart();
    createGlcTrendChart();
    createGlcProductChart();
    createGplTrendChart();
    createGplServiceChart();
    createLoungeChart();
    createLoungeSourceChart();
    createGarbarataChart();
    updateTargetTable();
    updateStationTargetTable();
    createStationDiffBarChart();
}

// Tab switching logic
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');
            
            const target = tab.getAttribute('data-tab');
            contents.forEach(content => {
                if (content.id === `tab-${target}`) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    // Event Listeners for filters
    document.getElementById('period').addEventListener('change', () => updateDashboard());
    
    // Initial dashboard load
    updateDashboard();

    // Initialize Litepicker
    const picker = new Litepicker({ 
        element: document.getElementById('date-range'),
        singleMode: false,
        format: 'DD MMM YYYY',
        lang: 'id-ID',
        tooltipText: {
            one: 'hari',
            other: 'hari'
        },
        setup: (picker) => {
            picker.on('selected', (date1, date2) => {
                updateDashboard(date1, date2);
            });
        }
    });
});

