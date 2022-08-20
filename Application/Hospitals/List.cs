using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Hospitals
{
    public class List
    {
        public class Query : IRequest<Result<List<Hospital>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Hospital>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Hospital>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Hospital>>.Success(await _context.Hospitals.ToListAsync());
            }
        }
    }
}