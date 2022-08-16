using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hospitals
{
    public class List
    {
        public class Query : IRequest<List<Hospital>>{}

        public class Handler : IRequestHandler<Query, List<Hospital>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Hospital>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Hospitals.ToListAsync();
            }
        }
    }
}